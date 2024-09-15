const Main = () => {
  return (
    <div className="flex flex-col gap-9 lg:gap-16">
      <div className="flex flex-col gap-4">
        <h2 className="font-Lato text-4xl font-medium text-[#E7E7E7]">
          Test Your
        </h2>
        <h3 className="font-Lato text-4xl font-medium text-[#FF6340]">
          Knowledge!
        </h3>
      </div>

      <p className="my-3 ml-9 mr-4 border-r-2 pr-3 text-right font-Barlow text-[#E7E7E7] sm:pl-40 sm:text-lg md:pl-60 lg:ml-96">
        Quizro is a specialized quiz app designed for developers, sysadmins, and
        tech enthusiasts. Whether you&apos;re looking to sharpen your skills or
        test your knowledge in specific technical domains, Quizro offers focused
        quizzes that cater to your professional interests.
      </p>
    </div>
  );
};

export default Main;
