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
  let respuestas = {};
  
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
  
  function conjugatePresentSimple(verb, subject) {
    if (!["he", "she", "it"].includes(subject.toLowerCase())) {
      return verb;
    }
  
    if (verb.endsWith("y") && !/[aeiou]y$/.test(verb)) {
      return verb.slice(0, -1) + "ies";
    }
  
    if (/(ch|sh|ss|x|o)$/.test(verb)) {
      return verb + "es";
    }
  
    return verb + "s";
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
        ifPart = conjugatePresentSimple(verb1.base, subject1);
        mainPart = conjugatePresentSimple(verb2.base, subject2);
        break;
      case 1:
        tipo = "First Conditional";
        ifPart = conjugatePresentSimple(verb1.base, subject1);
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
      sujetoIf: subject1.toLowerCase(),
      sujetoMain: subject2.toLowerCase(),
      baseIfVerb: verb1.base.toLowerCase(),
      baseMainVerb: verb2.base.toLowerCase(),
      condicional,
    };
  
    let enunciado;
    if (ifFirst) {
      enunciado = `If ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${verb1.base}), ${subject2} <input id="inputMain" placeholder="verbo" /> (${verb2.base}).`;
    } else {
      enunciado = `${subject2} <input id="inputMain" placeholder="verbo" /> (${verb2.base}) if ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${verb1.base}).`;
    }
  
    document.getElementById("tipoCondicional").textContent = tipo;
    document.getElementById("enunciado").innerHTML = enunciado;
  }
  
  function verificar() {
    const ifVal = document.getElementById("inputIf").value.trim().toLowerCase();
    const mainVal = document.getElementById("inputMain").value.trim().toLowerCase();
    const fb = document.getElementById("feedback");
  
    let correctoIf, correctoMain;
  
    switch (respuestas.condicional) {
      case 0:
        correctoIf = conjugatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf);
        correctoMain = conjugatePresentSimple(respuestas.baseMainVerb, respuestas.sujetoMain);
        break;
      case 1:
        correctoIf = conjugatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf);
        correctoMain = `will ${respuestas.baseMainVerb}`;
        break;
      case 2:
        correctoIf = verbs.find(v => v.base === respuestas.baseIfVerb).past;
        correctoMain = `would ${respuestas.baseMainVerb}`;
        break;
      case 3:
        correctoIf = `had ${verbs.find(v => v.base === respuestas.baseIfVerb).pastParticiple}`;
        correctoMain = `would have ${verbs.find(v => v.base === respuestas.baseMainVerb).pastParticiple}`;
        break;
    }
  
    ifValFinal = ifVal.toLowerCase();
    mainValFinal = mainVal.toLowerCase();
    correctoIf = correctoIf.toLowerCase();
    correctoMain = correctoMain.toLowerCase();
  
    if (ifValFinal === correctoIf && mainValFinal === correctoMain) {
      fb.textContent = "✅ ¡Correcto!";
      fb.style.color = "green";
    } else {
      fb.innerHTML = `❌ Incorrecto.<br>
      Parte 'If': <strong>${correctoIf}</strong><br>
      Parte principal: <strong>${correctoMain}</strong>`;
      fb.style.color = "red";
    }
  }
  
  function nuevoEjercicio() {
    const tipo = Math.floor(Math.random() * 4); // 0-3
    document.getElementById("feedback").innerHTML = "";
    generarEjercicio(tipo);
  }
  
  nuevoEjercicio();
  