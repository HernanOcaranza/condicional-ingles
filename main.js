const verbs = [
    // Verbos comunes
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
    { base: "read", past: "read", pastParticiple: "read" },
    { base: "write", past: "wrote", pastParticiple: "written" },
    { base: "sleep", past: "slept", pastParticiple: "slept" },
    { base: "open", past: "opened", pastParticiple: "opened" },
    { base: "close", past: "closed", pastParticiple: "closed" },
    { base: "drive", past: "drove", pastParticiple: "driven" },
  
    // Verbos de programación y tecnología
    { base: "code", past: "coded", pastParticiple: "coded" },
    { base: "program", past: "programmed", pastParticiple: "programmed" },
    { base: "develop", past: "developed", pastParticiple: "developed" },
    { base: "design", past: "designed", pastParticiple: "designed" },
    { base: "test", past: "tested", pastParticiple: "tested" },
    { base: "debug", past: "debugged", pastParticiple: "debugged" },
    { base: "compile", past: "compiled", pastParticiple: "compiled" },
    { base: "run", past: "ran", pastParticiple: "run" },
    { base: "execute", past: "executed", pastParticiple: "executed" },
    { base: "build", past: "built", pastParticiple: "built" },
    { base: "fix", past: "fixed", pastParticiple: "fixed" },
    { base: "deploy", past: "deployed", pastParticiple: "deployed" },
    { base: "update", past: "updated", pastParticiple: "updated" },
    { base: "upload", past: "uploaded", pastParticiple: "uploaded" },
    { base: "download", past: "downloaded", pastParticiple: "downloaded" },
    { base: "install", past: "installed", pastParticiple: "installed" },
    { base: "connect", past: "connected", pastParticiple: "connected" },
    { base: "disconnect", past: "disconnected", pastParticiple: "disconnected" },
    { base: "integrate", past: "integrated", pastParticiple: "integrated" },
    { base: "configure", past: "configured", pastParticiple: "configured" },
    { base: "optimize", past: "optimized", pastParticiple: "optimized" }
  ];
  
  
  const subjects = ["I", "you", "he", "she", "it", "we", "they"];
  let respuestas = {};
  
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function getRandomVerb() {
    const verb = getRandom(verbs);
    const isNegative = Math.random() < 0.5;
    return {
      ...verb,
      isNegative,
      display: isNegative ? `not ${verb.base}` : `${verb.base}`
    };
  }

  function getTwoDifferent(arr) {
    let first = getRandomVerb(arr);
    let second;
    do {
      second = getRandomVerb(arr);
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

  function negatePresentSimple(verb, subject) {
    return ["he", "she", "it"].includes(subject.toLowerCase())
      ? `does not ${verb}`
      : `do not ${verb}`;
  }
  
  function negatePastSimple(verb, subject) {
    return `did not ${verb}`;
  }

  function normalizarFrase(frase) {
    return frase
      .replace(/\bdoesn't\b/g, "does not")
      .replace(/\bdon't\b/g, "do not")
      .replace(/\bdidn't\b/g, "did not")
      .replace(/\bwon't\b/g, "will not")
      .replace(/\bwouldn't\b/g, "would not")
      .replace(/\bhadn't\b/g, "had not")
      .replace(/\bhasn't\b/g, "has not")
      .replace(/\bhaven't\b/g, "have not")
      .replace(/\bwasn't\b/g, "was not")
      .replace(/\bweren't\b/g, "were not")
      .replace(/\bisn't\b/g, "is not")
      .replace(/\baren't\b/g, "are not")
      .toLowerCase();
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
          ifPart = verb1.isNegative
            ? negatePresentSimple(verb1.base, subject1)
            : conjugatePresentSimple(verb1.base, subject1);
          mainPart = verb2.isNegative
            ? negatePresentSimple(verb2.base, subject2)
            : conjugatePresentSimple(verb2.base, subject2);
          break;
        case 1:
          tipo = "First Conditional";
          ifPart = verb1.isNegative
            ? negatePresentSimple(verb1.base, subject1)
            : conjugatePresentSimple(verb1.base, subject1);
          mainPart = verb2.isNegative
            ? `will not ${verb2.base}`
            : `will ${verb2.base}`;
          break;
        case 2:
          tipo = "Second Conditional";
          ifPart = verb1.isNegative
            ? negatePastSimple(verb1.base, subject1)
            : verb1.past;
          mainPart = verb2.isNegative
            ? `would not ${verb2.base}`
            : `would ${verb2.base}`;
          break;
        case 3:
          tipo = "Third Conditional";
          ifPart = verb1.isNegative
            ? `had not ${verb1.pastParticiple}`
            : `had ${verb1.pastParticiple}`;
          mainPart = verb2.isNegative
            ? `would not have ${verb2.pastParticiple}`
            : `would have ${verb2.pastParticiple}`;
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
        isIfNegative: verb1.isNegative,
        isMainNegative: verb2.isNegative
      };
  
    let enunciado;
    if (ifFirst) {
      enunciado = `If ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${verb1.display}), ${subject2} <input id="inputMain" placeholder="verbo" /> (${verb2.display}).`;
    } else {
      enunciado = `${subject2} <input id="inputMain" placeholder="verbo" /> (${verb2.display}) if ${subject1.toLowerCase()} <input id="inputIf" placeholder="verbo" /> (${verb1.display}).`;
    }
  
    document.getElementById("tipoCondicional").textContent = tipo;
    document.getElementById("enunciado").innerHTML = enunciado;
  }
  
  function verificar() {
    const ifVal = document.getElementById("inputIf").value.trim().toLowerCase();
    const mainVal = document.getElementById("inputMain").value.trim().toLowerCase();
    const fb = document.getElementById("feedback");
  
    let correctoIf = "";
    let correctoMain = "";
  
    switch (respuestas.condicional) {
      case 0:
        correctoIf = respuestas.isIfNegative
          ? negatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf)
          : conjugatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf);
        correctoMain = respuestas.isMainNegative
          ? negatePresentSimple(respuestas.baseMainVerb, respuestas.sujetoMain)
          : conjugatePresentSimple(respuestas.baseMainVerb, respuestas.sujetoMain);
        break;
      case 1:
        correctoIf = respuestas.isIfNegative
          ? negatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf)
          : conjugatePresentSimple(respuestas.baseIfVerb, respuestas.sujetoIf);
        correctoMain = respuestas.isMainNegative
          ? `will not ${respuestas.baseMainVerb}`
          : `will ${respuestas.baseMainVerb}`;
        break;
      case 2:
        correctoIf = respuestas.isIfNegative
          ? negatePastSimple(respuestas.baseIfVerb, respuestas.sujetoIf)
          : verbs.find(v => v.base === respuestas.baseIfVerb).past;
        correctoMain = respuestas.isMainNegative
          ? `would not ${respuestas.baseMainVerb}`
          : `would ${respuestas.baseMainVerb}`;
        break;
      case 3:
        correctoIf = respuestas.isIfNegative
          ? `had not ${verbs.find(v => v.base === respuestas.baseIfVerb).pastParticiple}`
          : `had ${verbs.find(v => v.base === respuestas.baseIfVerb).pastParticiple}`;
        correctoMain = respuestas.isMainNegative
          ? `would not have ${verbs.find(v => v.base === respuestas.baseMainVerb).pastParticiple}`
          : `would have ${verbs.find(v => v.base === respuestas.baseMainVerb).pastParticiple}`;
        break;
    }
  
    const ifValFinal = normalizarFrase(ifVal);
    const mainValFinal = normalizarFrase(mainVal);
  
    if (ifValFinal === correctoIf.toLowerCase() && mainValFinal === correctoMain.toLowerCase()) {
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
  