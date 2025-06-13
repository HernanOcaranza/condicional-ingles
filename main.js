const verbs = [
    { base: "go", past: "went", pastParticiple: "gone" },
    { base: "eat", past: "ate", pastParticiple: "eaten" },
    { base: "study", past: "studied", pastParticiple: "studied" },
    { base: "play", past: "played", pastParticiple: "played" },
    { base: "stay", past: "stayed", pastParticiple: "stayed" },
    { base: "watch", past: "watched", pastParticiple: "watched" },
    { base: "cook", past: "cooked", pastParticiple: "cooked" },
    { base: "see", past: "saw", pastParticiple: "seen" },
    { base: "have", past: "had", pastParticiple: "had" },
    { base: "make", past: "made", pastParticiple: "made" },
    { base: "buy", past: "bought", pastParticiple: "bought" },
    { base: "drink", past: "drank", pastParticiple: "drunk" },
  ];

  const subjects = ["I", "you", "he", "she", "we", "they"];
  let respuestas = { ifPart: "", mainPart: "" };

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getTwoDifferent(arr) {
    let first = getRandom(arr);
    let second;
    do {
      second = getRandom(arr);
    } while (second.base === first.base);
    return [first, second];
  }

  function generarEjercicio(condicional) {
    const [verb1, verb2] = getTwoDifferent(verbs);
    const subject1 = getRandom(subjects);
    const subject2 = getRandom(subjects);
    const ifFirst = Math.random() < 0.5;

    let tipo = "";
    let ifPart = "";
    let mainPart = "";

    switch (condicional) {
      case 0:
        tipo = "Zero Conditional";
        ifPart = verb1.base;
        mainPart = verb2.base;
        break;
      case 1:
        tipo = "First Conditional";
        ifPart =
          subject1 === "he" || subject1 === "she"
            ? verb1.base + "s"
            : verb1.base;
        mainPart = `will ${verb2.base}`;
        break;
      case 2:
        tipo = "Second Conditional";
        ifPart = verb1.past;
        mainPart = `would ${verb2.base}`;
        break;
      case 3:
        tipo = "Third Conditional";
        ifPart = `had ${verb1.pastParticiple}`;
        mainPart = `would have ${verb2.pastParticiple}`;
        break;
    }

    respuestas = {
      ifPart: ifPart.toLowerCase(),
      mainPart: mainPart.toLowerCase(),
    };

    let enunciado;
    if (ifFirst) {
      enunciado = `If ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${
        verb1.base
      }), ${subject2} <input id="inputMain" placeholder="verbo" /> (${
        verb2.base
      }).`;
    } else {
      enunciado = `${subject2} <input id="inputMain" placeholder="verbo" /> (${
        verb2.base
      }) if ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${
        verb1.base
      }).`;
    }

    document.getElementById("tipoCondicional").textContent = tipo;
    document.getElementById("enunciado").innerHTML = enunciado;
  }

  function verificar() {
    const ifVal = document
      .getElementById("inputIf")
      .value.trim()
      .toLowerCase();
    const mainVal = document
      .getElementById("inputMain")
      .value.trim()
      .toLowerCase();
    const fb = document.getElementById("feedback");

    if (ifVal === respuestas.ifPart && mainVal === respuestas.mainPart) {
      fb.textContent = "✅ ¡Correcto!";
      fb.style.color = "green";
    } else {
      fb.innerHTML = `❌ Incorrecto.<br>
      Parte 'If': <strong>${respuestas.ifPart}</strong><br>
      Parte principal: <strong>${respuestas.mainPart}</strong>`;
      fb.style.color = "red";
    }
  }

  function nuevoEjercicio() {
    const tipo = Math.floor(Math.random() * 4); // 0-3
    document.getElementById("feedback").innerHTML = "";
    generarEjercicio(tipo);
  }

  nuevoEjercicio();