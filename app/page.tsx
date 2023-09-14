export default function Home() {
  return (
    <main className="flex flex-col justify-center w-screen h-screen ml-24">
      <h1 className="text-4xl font-bold pb-10 tracking-wide">
        Planifiez facilement vos activités <br /> avec vos ami.e.s
      </h1>
      <p className="text-gray-500">
        Finies les difficultés pour programmer vos sorties ou activités en
        groupe.
      </p>
      <p className="text-gray-500">PlanTogether s&apos;occupe de tout.</p>
      <div className="flex space-x-4 mt-8">
        <button type="button" className="bg-black text-white px-4 py-2 rounded">
          Commencer
        </button>
        <button
          type="button"
          className="bg-white text-black border border-black px-4 py-2 rounded"
        >
          En savoir plus
        </button>
      </div>
    </main>
  );
}
