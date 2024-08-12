import { useState } from "react";
import { SCHEMES, WORKOUTS } from "../utils/exercise";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

function Generator(props) {
  const {
    muscles,
    setMuscles,
    poison,
    setPoison,
    goal,
    setGoal,
    updateWorkout,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup) && muscles.length >= 2) {
      let newMuscles = muscles.filter((val) => val !== muscleGroup);
      setMuscles(newMuscles);
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison != "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);

    if (muscles.includes(muscleGroup) && muscles.length < 2) {
      let newMuscles = muscles.filter((val) => val !== muscleGroup);
      setMuscles(newMuscles);
    }

    if (muscles.length === 2) {
      setShowModal(false);
    }
  }

  return (
    <SectionWrapper
      id={"generate"}
      header={"GENERATE YOUR WORKOUT"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your workout"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border border-blue-400 duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                (type === poison ? "border-blue-600" : "border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={poison === "" ? null : toggleModal}
          className={`relative flex items-center justify-center p-3 ${
            poison === "" ? "cursor-not-allowed" : ""
          }`}
        >
          <p className="capitalize">
            {poison === "individual" && muscles.length === 0
              ? "Select Select muscle groups (up to 3)"
              : muscles.length === 0
              ? "Select muscle groups"
              : muscles.join(" ")}
          </p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 "></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3 border-t border-gray-100 border-opacity-50">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={
                "bg-slate-950 border border-blue-400 duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                (scheme === goal ? "border-blue-600" : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button text={"Formulate"} func={updateWorkout} />
    </SectionWrapper>
  );
}

export default Generator;
