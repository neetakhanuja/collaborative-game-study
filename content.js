const APP_CONFIG = {
  defaultLanguage: "gu",
  supportedLanguages: ["gu", "hi", "en"]
};

const UI_TEXT = {
  gu: {
    appTitle: "સહયોગી રમત પ્રોટોટાઇપ",
    appSubtitle: "વડીલ જોડીઓ માટે ચાર અલગ સહયોગી રમતિયાળ પ્રવૃત્તિઓ.",
    languageLabel: "ભાષા",
    installApp: "એપ ઇન્સ્ટોલ કરો",

    homeTitle: "એક પ્રવૃત્તિ પસંદ કરો",
    homeText: "દરેક પ્રવૃત્તિ ટેબ્લેટ પર બે લોકો સાથે મળીને કરવા માટે રચાયેલ છે.",

    homeCards: {
      guided: {
        title: "1. માર્ગ શોધવો",
        desc: "એક વ્યક્તિ માર્ગ બતાવે છે અને બીજી વ્યક્તિ ચલાવે છે. બંને મળીને ગંતવ્ય સુધી પહોંચે છે.",
        cta: "પ્રવૃત્તિ શરૂ કરો"
      },
      helping: {
        title: "2. ઇચ્છા હોય તો મદદ કરો",
        desc: "એક વ્યક્તિ ફિલ્મનું નામ શોધે છે અને બીજી વ્યક્તિ ઇચ્છે તો મદદ કરે છે.",
        cta: "પ્રવૃત્તિ શરૂ કરો"
      },
      door: {
        title: "3. યોગ્ય દરવાજો પસંદ કરો",
        desc: "બે લોકો મળીને સંકેત સમજી યોગ્ય દરવાજો પસંદ કરે છે.",
        cta: "પ્રવૃત્તિ શરૂ કરો"
      },
      song: {
        title: "4. ગીત પૂર્ણ કરો",
        desc: "બે લોકો મળીને ગીતની પંક્તિઓનો યોગ્ય ક્રમ બનાવે છે.",
        cta: "પ્રવૃત્તિ શરૂ કરો"
      }
    },

    common: {
      home: "હોમ",
      nextRound: "આગળનો રાઉન્ડ",
      nextHint: "આગળનો સંકેત",
      reset: "ફરી શરૂ કરો",
      tryAgain: "ફરી પ્રયાસ કરો",
      done: "પૂર્ણ થયું",
      select: "પસંદ કરો",
      checkOrder: "ક્રમ તપાસો",
      nextSong: "આગળનું ગીત",
      showAnswer: "જવાબ જુઓ",
      help: "મદદ કરો",
      openDoor: "દરવાજો ખોલો",
      nextClue: "આગળનો સંકેત",
      switchRoles: "ભૂમિકા બદલો",
      lives: "Lives"
    },

    guided: {
      title: "માર્ગ શોધવો",
      text: "એક વ્યક્તિ માર્ગ બતાવશે અને બીજી વ્યક્તિ ટેબ્લેટ પરથી આગળ વધશે. પથ્થર સાથે અથડાશો તો એક life ઓછી થશે.",
      moveHere: "અહીંથી ચાલાવો",
      reached: "✨ તમે બંને ગંતવ્ય સુધી પહોંચી ગયા!",
      lost: "💥 Lives પૂર્ણ થઈ ગઈ. ફરી પ્રયાસ કરો."
    },

    helping: {
      title: "ઇચ્છા હોય તો મદદ કરો",
      text: "એક વ્યક્તિ ફિલ્મનું નામ અનુમાન કરશે. બીજી વ્યક્તિ ઇચ્છે તો વધારાની મદદ આપી શકે છે.",
      hintLabel: "સંકેત",
      helperLabel: "મદદગાર",
      helperText: "તમે હવે વધારાનો સંકેત આપી શકો છો.",
      revealPrompt: "જો હવે જવાબ જોવો હોય તો અહીં દબાવો",
      answerLabel: "સાચો જવાબ"
    },

    door: {
      title: "યોગ્ય દરવાજો પસંદ કરો",
      text: "સંકેત વાંચો, ચર્ચા કરો અને બંને મળીને એક દરવાજો પસંદ કરો.",
      clueLabel: "સંકેત",
      success: "✨ અભિનંદન! સાચો દરવાજો પસંદ કર્યો.",
      fail: "💨 આ દરવાજા પાછળ ઇનામ નહોતું."
    },

    song: {
      title: "ગીત પૂર્ણ કરો",
      text: "આ ગીતની પંક્તિઓને મળીને સાચા ક્રમમાં ગોઠવો.",
      prompt: "આ પંક્તિ પછી શું આવશે?",
      yourOrder: "તમારો ક્રમ",
      emptySelection: "હજુ પસંદગી નથી.",
      success: "🎵 સાચો ક્રમ! ગીત વગાડાઈ રહ્યું છે.",
      fail: "આ ક્રમ સાચો નહોતો. ફરી પ્રયાસ કરો."
    }
  },

  hi: {
    appTitle: "सहयोगी खेल प्रोटोटाइप",
    appSubtitle: "बुजुर्ग जोड़ों के लिए चार अलग सहयोगी खेल गतिविधियाँ।",
    languageLabel: "भाषा",
    installApp: "ऐप इंस्टॉल करें",

    homeTitle: "एक गतिविधि चुनें",
    homeText: "हर गतिविधि इस तरह बनाई गई है कि टैबलेट पर दो लोग मिलकर इसे कर सकें।",

    homeCards: {
      guided: {
        title: "1. रास्ता ढूँढना",
        desc: "एक व्यक्ति रास्ता बताता है और दूसरा व्यक्ति चलता है। दोनों मिलकर मंज़िल तक पहुँचते हैं।",
        cta: "गतिविधि शुरू करें"
      },
      helping: {
        title: "2. चाहें तो मदद करें",
        desc: "एक व्यक्ति फिल्म का नाम पहचानता है और दूसरा चाहे तो मदद कर सकता है।",
        cta: "गतिविधि शुरू करें"
      },
      door: {
        title: "3. सही दरवाज़ा चुनें",
        desc: "दो लोग मिलकर संकेत समझते हैं और सही दरवाज़ा चुनते हैं।",
        cta: "गतिविधि शुरू करें"
      },
      song: {
        title: "4. गीत पूरा करें",
        desc: "दो लोग मिलकर गीत की पंक्तियों का सही क्रम बनाते हैं।",
        cta: "गतिविधि शुरू करें"
      }
    },

    common: {
      home: "होम",
      nextRound: "अगला राउंड",
      nextHint: "अगला संकेत",
      reset: "फिर से शुरू करें",
      tryAgain: "फिर कोशिश करें",
      done: "पूरा हुआ",
      select: "चुनें",
      checkOrder: "क्रम जाँचें",
      nextSong: "अगला गीत",
      showAnswer: "उत्तर देखें",
      help: "मदद करें",
      openDoor: "दरवाज़ा खोलें",
      nextClue: "अगला संकेत",
      switchRoles: "भूमिका बदलें",
      lives: "Lives"
    },

    guided: {
      title: "रास्ता ढूँढना",
      text: "एक व्यक्ति रास्ता बताएगा और दूसरा व्यक्ति टैबलेट से आगे बढ़ेगा। पत्थर से टकराने पर एक life कम हो जाएगी।",
      moveHere: "यहाँ से चलाएँ",
      reached: "✨ आप दोनों मंज़िल तक पहुँच गए!",
      lost: "💥 Lives समाप्त हो गईं। फिर कोशिश करें।"
    },

    helping: {
      title: "चाहें तो मदद करें",
      text: "एक व्यक्ति फिल्म का नाम अनुमान लगाएगा। दूसरा व्यक्ति चाहे तो अतिरिक्त मदद दे सकता है।",
      hintLabel: "संकेत",
      helperLabel: "सहायक",
      helperText: "अब आप अतिरिक्त संकेत दे सकते हैं।",
      revealPrompt: "यदि अब उत्तर देखना हो तो यहाँ दबाएँ",
      answerLabel: "सही उत्तर"
    },

    door: {
      title: "सही दरवाज़ा चुनें",
      text: "संकेत पढ़ें, चर्चा करें और मिलकर एक दरवाज़ा चुनें।",
      clueLabel: "संकेत",
      success: "✨ बधाई हो! आपने सही दरवाज़ा चुना।",
      fail: "💨 इस दरवाज़े के पीछे इनाम नहीं था।"
    },

    song: {
      title: "गीत पूरा करें",
      text: "इस गीत की पंक्तियों को मिलकर सही क्रम में लगाएँ।",
      prompt: "इस पंक्ति के बाद क्या आएगा?",
      yourOrder: "आपका क्रम",
      emptySelection: "अभी कोई चयन नहीं है।",
      success: "🎵 सही क्रम! गीत चल रहा है।",
      fail: "यह क्रम सही नहीं था। फिर कोशिश करें।"
    }
  },

  en: {
    appTitle: "Collaborative Game Prototype",
    appSubtitle: "Four collaborative game-like activities for older adult pairs.",
    languageLabel: "Language",
    installApp: "Install App",

    homeTitle: "Choose an activity",
    homeText: "Each activity is designed for two people to do together on a tablet.",

    homeCards: {
      guided: {
        title: "1. Guided Path Navigation",
        desc: "One person guides and the other person moves. Both reach the destination together.",
        cta: "Start activity"
      },
      helping: {
        title: "2. Helping Without Reward",
        desc: "One person guesses the film title and the second person may help if they wish.",
        cta: "Start activity"
      },
      door: {
        title: "3. Choose the Right Door",
        desc: "Two people discuss the clue together and choose one door.",
        cta: "Start activity"
      },
      song: {
        title: "4. Complete the Song",
        desc: "Two people arrange the song lines in the correct order together.",
        cta: "Start activity"
      }
    },

    common: {
      home: "Home",
      nextRound: "Next round",
      nextHint: "Next hint",
      reset: "Start over",
      tryAgain: "Try again",
      done: "Done",
      select: "Select",
      checkOrder: "Check order",
      nextSong: "Next song",
      showAnswer: "Show answer",
      help: "Help",
      openDoor: "Open door",
      nextClue: "Next clue",
      switchRoles: "Switch roles",
      lives: "Lives"
    },

    guided: {
      title: "Guided Path Navigation",
      text: "One person gives directions and the other moves on the tablet. Hitting a rock removes one life.",
      moveHere: "Move from here",
      reached: "✨ You both reached the destination!",
      lost: "💥 All lives are gone. Try again."
    },

    helping: {
      title: "Helping Without Reward",
      text: "One person guesses the movie title. The second person may offer extra help if they wish.",
      hintLabel: "Hint",
      helperLabel: "Helper",
      helperText: "You may now offer an extra clue.",
      revealPrompt: "Press here if you now want to see the answer",
      answerLabel: "Correct answer"
    },

    door: {
      title: "Choose the Right Door",
      text: "Read the clue, discuss it together, and choose one door.",
      clueLabel: "Clue",
      success: "✨ Well done! You chose the correct door.",
      fail: "💨 There was no reward behind this door."
    },

    song: {
      title: "Complete the Song",
      text: "Work together to arrange these lines in the correct order.",
      prompt: "What comes after this line?",
      yourOrder: "Your order",
      emptySelection: "No selection yet.",
      success: "🎵 Correct order! The song is now playing.",
      fail: "That order was not correct. Try again."
    }
  }
};

const PROBE_CONTENT = {
  guidedMaps: [
    {
      title: { gu: "રાઉન્ડ 1", hi: "राउंड 1", en: "Round 1" },
      playerStart: 0,
      goal: 24,
      landmarks: { 2:'🛕', 8:'🛒', 16:'🌳', 21:'🚌' },
      obstacles: [6, 11, 17]
    },
    {
      title: { gu: "રાઉન્ડ 2", hi: "राउंड 2", en: "Round 2" },
      playerStart: 4,
      goal: 20,
      landmarks: { 1:'🌳', 7:'🛒', 13:'🚌', 22:'🛕' },
      obstacles: [8, 14, 18]
    }
  ],

  helping: {
    rounds: [
      {
        movie: { gu: "Sholay", hi: "Sholay", en: "Sholay" },
        hints: {
          gu: [
            "એક નાનું ગામ વારંવાર ડરની છાયામાં જીવતું રહે છે.",
            "બે બહારથી આવેલા લોકો ત્યાં રહેવા નથી આવતા, પણ કોઈ કામ પૂરું કરવા આવે છે.",
            "એક સ્ત્રીની ઝડપી વાતચીત અને એક ખતરનાક ડાકુ બંને આ કહાનીને યાદગાર બનાવે છે."
          ],
          hi: [
            "एक छोटा गाँव बार-बार डर की छाया में जीता है।",
            "दो बाहरी लोग वहाँ रहने नहीं आते, बल्कि एक काम पूरा करने आते हैं।",
            "एक स्त्री की तेज़ बातचीत और एक खतरनाक डाकू इस कहानी को यादगार बनाते हैं।"
          ],
          en: [
            "A small village lives under repeated fear.",
            "Two outsiders do not arrive to settle there. They come to complete a task.",
            "A fast-talking woman and a dangerous bandit make this story memorable."
          ]
        }
      },
      {
        movie: { gu: "Guide", hi: "Guide", en: "Guide" },
        hints: {
          gu: [
            "આ કહાનીમાં રસ્તો બતાવનાર માણસ પોતાનો રસ્તો જ બદલી નાખે છે.",
            "એક સ્ત્રીની કલા અને પોતાની ઓળખ શોધવાની ઇચ્છા આખી કહાનીને આગળ ધપાવે છે.",
            "પ્રેમ, સ્વતંત્રતા અને આત્મિક બદલાવ ત્રણેય એકસાથે જોડાય છે."
          ],
          hi: [
            "इस कहानी में रास्ता दिखाने वाला व्यक्ति अपना ही रास्ता बदल देता है।",
            "एक स्त्री की कला और अपनी पहचान खोजने की इच्छा कहानी को आगे बढ़ाती है।",
            "प्रेम, स्वतंत्रता और आंतरिक परिवर्तन तीनों एक साथ जुड़ते हैं।"
          ],
          en: [
            "In this story, a man who guides others changes his own path.",
            "A woman's art and her wish to find her own identity drive the story forward.",
            "Love, freedom, and spiritual change are woven together."
          ]
        }
      },
      {
        movie: { gu: "Mughal-e-Azam", hi: "Mughal-e-Azam", en: "Mughal-e-Azam" },
        hints: {
          gu: [
            "આ કહાનીમાં સત્તા અને પ્રેમ આમને સામને ઊભા થાય છે.",
            "એક રાજપરિવાર અને એક કલાકાર સ્ત્રી વચ્ચેનો તણાવ આખી કહાનીમાં દેખાય છે.",
            "ભવ્ય દૃશ્યો અને ઐતિહાસિક ભાવના માટે આ ફિલ્મ ખૂબ જાણીતી છે."
          ],
          hi: [
            "इस कहानी में सत्ता और प्रेम आमने-सामने खड़े होते हैं।",
            "एक राजपरिवार और एक कलाकार स्त्री के बीच तनाव पूरी कहानी में दिखाई देता है।",
            "भव्य दृश्य और ऐतिहासिक भाव के लिए यह फिल्म बहुत प्रसिद्ध है।"
          ],
          en: [
            "Power and love stand against each other in this story.",
            "Tension between a royal family and a performer runs through the film.",
            "It is widely remembered for its grandeur and historical feeling."
          ]
        }
      }
    ]
  },

  door: {
    scenarios: [
      {
        clue: {
          gu: "એક દરવાજો ધ્યાન ખેંચે છે, બીજો વિશ્વાસ રાખે છે.",
          hi: "एक दरवाज़ा ध्यान खींचता है, दूसरा भरोसा माँगता है।",
          en: "One door attracts attention. The other asks for trust."
        },
        left: { label: { gu: "દરવાજો A", hi: "दरवाज़ा A", en: "Door A" }, style: "decorated", visual: "✨" },
        right: { label: { gu: "દરવાજો B", hi: "दरवाज़ा B", en: "Door B" }, style: "locked", visual: "🔒" },
        correct: "B"
      },
      {
        clue: {
          gu: "બે દરવાજા સામે છે. એક વધુ દેખાય છે, એક શાંત છે.",
          hi: "दो दरवाज़े सामने हैं। एक ज़्यादा दिखता है, एक शांत है।",
          en: "Two doors stand before you. One draws the eye. One stays quiet."
        },
        left: { label: { gu: "દરવાજો A", hi: "दरवाज़ा A", en: "Door A" }, style: "bright", visual: "🌟" },
        right: { label: { gu: "દરવાજો B", hi: "दरवाज़ा B", en: "Door B" }, style: "simple", visual: "🚪" },
        correct: "B"
      },
      {
        clue: {
          gu: "આજે ઇનામ ત્યાં નથી જ્યાં વધુ સુરક્ષા દેખાય છે; આજે તે દરવાજા પાછળ છે જે સહેલું લાગે છે.",
          hi: "आज इनाम वहाँ नहीं है जहाँ ज़्यादा सुरक्षा दिखती है। आज वह उस दरवाज़े के पीछे है जो आसान लगता है।",
          en: "Today the reward is not where protection looks strongest. It is behind the door that seems easier."
        },
        left: { label: { gu: "દરવાજો A", hi: "दरवाज़ा A", en: "Door A" }, style: "simple", visual: "🪵" },
        right: { label: { gu: "દરવાજો B", hi: "दरवाज़ा B", en: "Door B" }, style: "iron", visual: "🛡️" },
        correct: "A"
      },
      {
        clue: {
          gu: "એક દરવાજો કહે છે ‘મને જો’, બીજો કહે છે ‘મને સમજ’.",
          hi: "एक दरवाज़ा कहता है ‘मुझे देखो’, दूसरा कहता है ‘मुझे समझो’।",
          en: "One door says, ‘look at me.’ The other says, ‘understand me.’"
        },
        left: { label: { gu: "દરવાજો A", hi: "दरवाज़ा A", en: "Door A" }, style: "decorated", visual: "🌸" },
        right: { label: { gu: "દરવાજો B", hi: "दरवाज़ा B", en: "Door B" }, style: "dim", visual: "🌙" },
        correct: "B"
      }
    ]
  },

  song: {
    rounds: [
      {
        song: { gu: "Pal Pal Dil Ke Paas", hi: "Pal Pal Dil Ke Paas", en: "Pal Pal Dil Ke Paas" },
        line: {
          gu: "… दिल के पास तुम रहती हो",
          hi: "… दिल के पास तुम रहती हो",
          en: "… dil ke paas tum rehti ho"
        },
        audio: "./assets/audio/palpal.mp3",
        options: [
          { text: { gu: "पल पल दिल के पास", hi: "पल पल दिल के पास", en: "Pal pal dil ke paas" } },
          { text: { gu: "तुम रहती हो", hi: "तुम रहती हो", en: "tum rehti ho" } },
          { text: { gu: "जीवन मीठी प्यास ये कहती हो", hi: "जीवन मीठी प्यास ये कहती हो", en: "jeevan meethi pyaas ye kehti ho" } },
          { text: { gu: "हर शाम आँखों पर तेरा आँचल लहराए", hi: "हर शाम आँखों पर तेरा आँचल लहराए", en: "har shaam aankhon par tera aanchal lehraaye" } }
        ]
      },
      {
        song: { gu: "Ajeeb Dastan Hai Yeh", hi: "Ajeeb Dastan Hai Yeh", en: "Ajeeb Dastan Hai Yeh" },
        line: {
          gu: "… ये मंज़िलें हैं कौन सी",
          hi: "… ये मंज़िलें हैं कौन सी",
          en: "… ye manzilein hain kaun si"
        },
        audio: "./assets/audio/ajeeb.mp3",
        options: [
          { text: { gu: "अजीब दास्तां है ये", hi: "अजीब दास्तां है ये", en: "Ajeeb dastan hai yeh" } },
          { text: { gu: "कहाँ शुरू कहाँ ख़तम", hi: "कहाँ शुरू कहाँ ख़तम", en: "kahan shuru kahan khatam" } },
          { text: { gu: "ये मंज़िलें हैं कौन सी", hi: "ये मंज़िलें हैं कौन सी", en: "ye manzilein hain kaun si" } },
          { text: { gu: "ना वो समझ सके ना हम", hi: "ना वो समझ सके ना हम", en: "na woh samajh sake na hum" } }
        ]
      }
    ]
  }
};