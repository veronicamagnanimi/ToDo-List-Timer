import TasksList from "../components/TasksList";
import Timer from "../components/Timer";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="text-center my-4">
          <div className="main-box">
            <Timer />
          <div className="gradient-bg text-center py-4 rounded">
            <h1>ToDo List</h1>
            <hr className="separator" />
            <TasksList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
