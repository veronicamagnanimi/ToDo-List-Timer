import Timer from "../components/timer";
import TaskList from "../components/taskList";

const Home = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="gradient-bg text-center p-4 rounded mb-4">
          <h2>ToDo List</h2>
          <h5>Inizia a pianificare le tue attività!</h5>
        </div>

        {/* timer */}
        <div className="text-center my-4">
          <Timer />
        </div>
        <TaskList />
      </div>
    </>
  );
};

export default Home;
