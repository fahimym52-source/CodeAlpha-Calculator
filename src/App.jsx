import { useState } from "react";
import "./App.css";
function App() {
  const [display, setDisplay] = useState("0");

  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);

  const [isCalculated, setIsCalculated] = useState(false);

  const [expression, setExpression] = useState("");

  const handleNumber = (number) => {
    if (isCalculated) {
      setDisplay(number);
      setIsCalculated(false);
      return;
    }
    setDisplay((prev) => (prev === "0" ? number : prev + number));
  };

  const handleOperator = (op) => {
    if (operator !== null) {
      setOperator(op);
      return;
    }
    setFirstNumber(Number(display));
    setOperator(op);
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
  };
  const handleDelet = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
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
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md rounded-3xl border border-cyan-500/40 bg-slate-900 p-6 shadow-2xl shadow-purple-500/20">
        <h1 className="text-center text-2xl font-bold text-white">
          <span className="text-purple-400">NEXORA</span>{" "}
          <span className="text-cyan-400">Calculator</span>
        </h1>
        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/80 p-5 shadow-inner shadow-cyan-500/5">
          <p className="mb-3 text-right text-sm tracking-widest text-slate-400">
            {expression}
          </p>

          <p className="text-right text-4xl font-bold text-white">{display}</p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3">
          <button
            onClick={clearHandle}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-cyan-400 transition hover:bg-slate-700"
          >
            AC
          </button>
          <button
            onClick={handleDelet}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-cyan-400 transition hover:bg-slate-700"
          >
            DEL
          </button>
          <button
            onClick={handlePrecent}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-cyan-400 transition hover:bg-slate-700"
          >
            %
          </button>
          <button
            onClick={() => handleOperator("/")}
            className="rounded-xl bg-purple-600/20 py-4 text-lg font-semibold text-purple-400 transition hover:bg-purple-600/40"
          >
            ÷
          </button>

          <button
            onClick={() => handleNumber("7")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            7
          </button>
          <button
            onClick={() => handleNumber("8")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            8
          </button>
          <button
            onClick={() => handleNumber("9")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            9
          </button>
          <button
            onClick={() => handleOperator("*")}
            className="rounded-xl bg-purple-600/20 py-4 text-lg font-semibold text-purple-400 transition hover:bg-purple-600/40"
          >
            ×
          </button>

          <button
            onClick={() => handleNumber("4")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            4
          </button>
          <button
            onClick={() => handleNumber("5")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            5
          </button>
          <button
            onClick={() => handleNumber("6")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            6
          </button>
          <button
            onClick={() => handleOperator("-")}
            className="rounded-xl bg-purple-600/20 py-4 text-lg font-semibold text-purple-400 transition hover:bg-purple-600/40"
          >
            −
          </button>

          <button
            onClick={() => handleNumber("1")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            1
          </button>
          <button
            onClick={() => handleNumber("2")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            2
          </button>
          <button
            onClick={() => handleNumber("3")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            3
          </button>
          <button
            onClick={() => handleOperator("+")}
            className="rounded-xl bg-purple-600/20 py-4 text-lg font-semibold text-purple-400 transition hover:bg-purple-600/40"
          >
            +
          </button>

          <button
            onClick={handleToggleSign}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-cyan-400 transition hover:bg-slate-700"
          >
            +/−
          </button>
          <button
            onClick={() => handleNumber("0")}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="rounded-xl bg-slate-800 py-4 text-lg font-semibold text-white transition hover:bg-slate-700"
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-125"
          >
            =
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
