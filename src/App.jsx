import { useEffect, useState } from "react";
import "./App.css";
import { Calculator, Sun, Moon } from "lucide-react";
function App() {
  const [display, setDisplay] = useState("0");

  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);

  const [isCalculated, setIsCalculated] = useState(false);

  const [expression, setExpression] = useState("");

  const [isDark, setIsDark] = useState(true);

  const handleNumber = (number) => {
    if (isCalculated) {
      setDisplay(number);
      setExpression(number);
      setIsCalculated(false);
      return;
    }
    setDisplay((prev) => (prev === "0" ? number : prev + number));
    if (operator !== null) {
      setExpression(
        `${firstNumber} ${operator} ${display === "0" ? number : display + number}`,
      );
    }
    if (operator === null) {
      setExpression(display === "0" ? number : display + number);
    }
  };

  const handleOperator = (op) => {
    if (operator !== null) {
      setOperator(op);
      setExpression(`${firstNumber} ${op}`);
      return;
    }
    setFirstNumber(Number(display));
    setOperator(op);
    setExpression(`${display} ${op}`);
    setDisplay("0");
  };

  const handleCalculate = () => {
    const secondNumber = Number(display);

    if (operator === "/" && secondNumber === 0) {
      setDisplay("Error");
      return;
    }

    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "-":
        result = firstNumber - secondNumber;
        break;

      case "*":
        result = firstNumber * secondNumber;
        break;

      case "/":
        result = firstNumber / secondNumber;
        break;

      default:
        return;
    }
    setExpression(`${firstNumber} ${operator} ${secondNumber} =`);

    setDisplay(String(result));
    setFirstNumber(null);
    setIsCalculated(true);
    setOperator(null);
  };

  const clearHandle = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setIsCalculated(false);
    setExpression("");
  };
  const handleDelet = () => {
    const newDisplay = display.length > 1 ? display.slice(0, -1) : "0";

    setDisplay(newDisplay);

    if (operator !== null) {
      setExpression(`${firstNumber} ${operator} ${newDisplay}`);
    } else {
      setExpression(newDisplay);
    }
  };
  const handlePrecent = () => {
    setDisplay(String(Number(display) / 100));
  };
  const handleDecimal = () => {
    if (isCalculated) {
      setDisplay("0.");
      setIsCalculated(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(Number(display) * -1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        handleNumber(event.key);
        console.log("Pressed key:", event.key);
      }

      if (["+", "-", "*", "/"].includes(event.key)) {
        handleOperator(event.key);
      }

      if (event.key === "Enter" || event.key === "=") {
        handleCalculate();
      }

      if (event.key === "Backspace") {
        handleDelet();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <main
      className={`min-h-screen flex items-center justify-center  p-4 pt-24 transition-colors duration-500 ${isDark ? "bg-slate-950" : "bg-slate-100"}`}
    >
      <header
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b  px-6 py-3 backdrop-blur-xl transition-colors duration-500 ${isDark ? "border-cyan-500/20 bg-slate-950/80" : "border-purple-200 bg-white"}`}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-2 text-white shadow-lg shadow-purple-500/30">
            <Calculator size={24} />
          </div>

          <div className="h-7 w-px bg-slate-600"></div>

          <span
            className={`text-sm font-medium transition-colors duration-500 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Smart Calculator
          </span>
        </div>
        <div
          className={`flex items-center gap-3 rounded-full border px-3 py-2 transition-all duration-500 ${
            isDark
              ? "border-purple-500/30 bg-slate-900/80"
              : "border-purple-200 bg-white shadow-sm"
          }`}
        >
          <button onClick={() => setIsDark(false)}>
            <Sun
              size={20}
              className={isDark ? "text-yellow-300" : "text-amber-500"}
            />
          </button>

          <button onClick={() => setIsDark(true)}>
            <Moon
              size={18}
              className={isDark ? "text-white" : "text-slate-500"}
            />
          </button>
        </div>
      </header>
      <div
        className={` w-full max-w-md rounded-3xl border   p-6 shadow-2xl transition-all duration-500  ${isDark ? "border-cyan-500/40 bg-slate-900 shadow-purple-500/20" : "border-purple-200 bg-white shadow-purple-200/60"}`}
      >
        <h1 className="text-center text-2xl font-bold text-white">
          {/* <span className="text-purple-400">N</span>{" "} */}
          <span className="text-cyan-400">Calculator</span>
        </h1>
        <div
          className={`w-full break-all mt-8 rounded-2xl border   p-5 shadow-inner transition-all duration-500 ${isDark ? "border-cyan-500/20 bg-slate-950/80 shadow-cyan-500/5" : "border-purple-200 bg-slate-100 shadow-purple-200/50"}`}
        >
          <p
            className={`mb-3 text-right text-sm tracking-widest  ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {expression}
          </p>

          <p
            className={`w-full break-all text-right text-4xl font-bold  ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {display}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3">
          <button
            onClick={clearHandle}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                : "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            AC
          </button>
          <button
            onClick={handleDelet}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                : "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            DEL
          </button>
          <button
            onClick={handlePrecent}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                : "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            %
          </button>
          <button
            onClick={() => handleOperator("/")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-purple-500/20 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40"
                : "border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            ÷
          </button>

          <button
            onClick={() => handleNumber("7")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            7
          </button>
          <button
            onClick={() => handleNumber("8")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            8
          </button>
          <button
            onClick={() => handleNumber("9")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            9
          </button>
          <button
            onClick={() => handleOperator("*")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-purple-500/20 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40"
                : "border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            ×
          </button>

          <button
            onClick={() => handleNumber("4")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            4
          </button>
          <button
            onClick={() => handleNumber("5")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            5
          </button>
          <button
            onClick={() => handleNumber("6")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            6
          </button>
          <button
            onClick={() => handleOperator("-")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-purple-500/20 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40"
                : "border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            −
          </button>

          <button
            onClick={() => handleNumber("1")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            1
          </button>
          <button
            onClick={() => handleNumber("2")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            2
          </button>
          <button
            onClick={() => handleNumber("3")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            3
          </button>
          <button
            onClick={() => handleOperator("+")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-purple-500/20 bg-purple-600/20 text-purple-400 hover:bg-purple-600/40"
                : "border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            +
          </button>

          <button
            onClick={handleToggleSign}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                : "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
          >
            +/−
          </button>
          <button
            onClick={() => handleNumber("0")}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className={`rounded-xl border py-4 text-lg font-semibold transition-all duration-300 ${
              isDark
                ? "border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100"
            }`}
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className={`rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:brightness-110 ${
              isDark
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 shadow-cyan-500/20"
                : "bg-gradient-to-r from-purple-600 to-blue-500 shadow-purple-300/50"
            }`}
          >
            =
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
