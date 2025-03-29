import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { IUser } from '@/models/User';

const NavbarListItem = ({ icon, text }) => (
  <div className='w-full flex justify-between items-center my-1 group'>
    <div className='flex justify-between items-center'>
      <div className='transition-all duration-200 ease-in-out group-hover:rotate-90'>
        {icon}
      </div>

      <p className='font-medium text-gray-400'>{text}</p>
    </div>
    <BsPlus className='text-green-500 group-hover:rotate-90 transition-all duration-200 ease-in-out' size="20" />
  </div>
);


interface NavbarProps {
 sharedData: {
    friends: boolean,
    channels: boolean
  },
  friends: IUser[] | undefined
}
const Navbar:React.FC<NavbarProps> = ({sharedData, friends}) => {



  return (
    <div className=' w-36   px-3 py-3 h-screen flex flex-col bg-gray-700 items-start'>
      <h3 className='text-gray-200 font-semibold tracking-wider mb-2'>Channels</h3>
{ sharedData.friends && friends?.map((friend)=> {
  return (
    <div>
      <h1>{friend.name}</h1>
    </div>
  )
})}
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Topics" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Questions" />
      <NavbarListItem icon={<MdKeyboardArrowRight size={20} className='text-green-500' />} text="Random" />
{/* {sharedData.directMessage &&<DirectMessages />} */}
    </div>
  );
};

export default Navbar;
