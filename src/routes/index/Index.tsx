import ProjectCard from "../../../components/index/ProjectCard.tsx";

const Index = () => {
  return (
    <div className="">
      <h1 className="text-7xl m-10">
        <b>think-v2</b>
      </h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-8 max-w-5xl place-items-center">
        <ProjectCard
          to="/PickupParty"
          title="🎉 Pickup Party 🎉"
          date="10/17/2025"
        />
        <ProjectCard
          to="/LyricTest"
          title="🎵 Lyric Test 🎵"
          date="10/2/2025"
        />
        <ProjectCard to="/" title="TBD" date="TBD" />
        <ProjectCard to="/" title="TBD" date="TBD" />
      </div>
    </div>
  );
};

export default Index;
