import WaitStaff from './Restaurant/WaitStaff';
import KitchenStaff from './Restaurant/KitchenStaff';
import Manager from './Restaurant/Manager';

const Home = () => {
  const role = localStorage.getItem("role");

  return (
    <div>
      You are logged in! log out by clearing local storage
      {role === "Customer" && <div>booking and loyalty here</div>}
      {role === "Wait Staff" && <WaitStaff />}
      {role === "Kitchen Staff" && <KitchenStaff />}
      {role === "Manager" && <Manager />}
    </div>
  );
};

export default Home;
