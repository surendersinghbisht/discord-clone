import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const InvitePage = () => {
  const { inviteId } = useParams();
  const navigate = useNavigate();


  const { data: authUser, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => axios.get('/auth/me', { withCredentials: true }),
  });

  useEffect(() => {
   
    if (isLoading) return;

    if (isError || !authUser?.data?.authenticated) {
      localStorage.setItem('pendingInvite', inviteId!);
      navigate('/login');
      return;
    }

    
    const joinServer = async () => {
      try {
        await axios.post(`/group/invite/${inviteId}`, {}, { withCredentials: true });
        navigate('/'); 
      } catch (error) {
        console.error('Error joining server:', error);
      }
    };

    joinServer();
  }, [inviteId, authUser, isLoading, isError, navigate]); 

 
  if (isLoading) {
    return <div className="text-white text-center p-8">Loading...</div>;
  }

  return <div className="text-white text-center p-8">Joining Server...</div>;
};

export default InvitePage;
