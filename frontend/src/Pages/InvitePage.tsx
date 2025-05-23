import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../api/api';
import toast from 'react-hot-toast';

const InvitePage = () => {

  const { channelId: inviteId } = useParams();
  const navigate = useNavigate();

  const { data: authUser, isLoading,  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error: any) {
        console.error("Error fetching /me:", error.response?.data);
        if (error.response?.status === 401) {
          return null;
        }
        toast.error(error.response?.data?.message || "Something went wrong");
        return null;
      }
    },
  });


  useEffect(() => {
    if (isLoading) return; 

    if (!authUser) {
      navigate('/login');
    }
  }, [isLoading, authUser, navigate]);

  useEffect(() => {
    if (isLoading || !authUser || !inviteId) return;

    const joinServer = async () => {
      try {
        await axiosInstance.put(`/group/invite/${inviteId}`, {});
        navigate('/'); 
      } catch (error) {
        console.error('Error joining server:', error);
        toast.error("Error joining server. Please try again.");
      }
    };

    joinServer();
  }, [isLoading, authUser, inviteId, navigate]);

  if (isLoading) {
    return <div className="text-white text-center p-8">Loading...</div>;
  }

  return <div className="text-white text-center p-8">Joining Server...</div>;
};

export default InvitePage;
