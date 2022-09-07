import { useSearchParams } from "react-router-dom";

const QuestionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div>
        {searchParams.get("optionOneCount") +
          searchParams.get("optionTwoCount")}
      </div>
    </>
  );
};

export default QuestionPage;
