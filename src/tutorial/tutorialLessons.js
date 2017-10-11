const config = {
  modes: ["Beginner", "Intermediate", "Advanced"],
  Beginner: {
    buttonDropDownLessons: [
              "J, F, and Space",
              "U, R, and K Keys",
              "D, E, and I Keys",
              "C, G, and N Keys",
              "Beginner Review 1",
              "T, S, and L Keys",
              "O, B, and A Keys",
              "V, H, and M Keys",
              "Period and Comma",
              "Beginner Review 2",
              "W, X and ; Keys",
              "Q, Y, and P Keys",
              "Z and Enter Keys",
              "Beginner Wrap Up"
    ],
    lessons: {
      "J, F, and Space": {
        debriefMessage: "Welcome to TypePhil! We are going to start off really easy. On the next screen, \
                     just type the letter J with your right index finger. \n \
                     To begin, press the Continue button bellow.",
        lessonContent: [["jjjjjjjjjjjj"]]
      },
      "U, R, and K Keys": {
        debriefMessage: "We will now begin typing the U key, which is on your keyboard's Top Row. \ " +
                        "Important! Your fingers should always rest lightly on the middle row keys, called \ " +
                        "the Home Row, as shown below.When typing a letter above or below the Home Row, only move \ " +
                        "that one finger, and always return to the Home Row.",
        lessonContent: [["j uuu j uuu j uuu j uuu j uuu j uuu j uuu j uuu"], ["juu juu juu juu juu juu juj juj juj juj juj juj"]]
      },
      "D, E, and I Keys": {
        debriefMessage: "New key: the letter D. While leaving your index finger on the F key, type the D key with your left hand's middle finger.",
        lessonContent: [["ddd fff ddd fff dff dff ffd ffd ddf ddf fdd fdd"], ["ddf ddf ddf ddf ffd ffd ffd ffd dfd dfd fdf fdf"]]
      },
      "C, G, and N Keys": {
        debriefMessage: "You are now going to learn the C key, which is your first time typing a Bottom Row letter. \
                          To type the C key, move your middle finger down from the D key, which it rests on when not typing. \
                          You may feel like using your ☞ index finger... Don't! Developing good habits and proper technique now will pay off later!",
        lessonContent: [["d ccc d ccc d ccc d ccc d ccc d ccc d ccc d ccc"], ["ccc ddd ccc ddd ccc ddd ccc ddd ccc ddd ccc ddd"], ["ccd ccd ccd ddc ddc ddc ddc ccd ddc ccd ddc ccd"]]
      },
      "Beginner Review 1": {
        debriefMessage: "Now that you have grasp of a dozen keys, we are going to review them by making word/letter combinations of everything you've learned so far. \
                        Tip: Stretch your wrists and fingers before you start typing. It seems silly, but it does help with speed and accuracy.",
        lessonContent: [["jjj fff uuu rrr kkk ddd eee iii ccc ggg nnn"], ["j f u r k d e i c g n r d k u f e j i g n c"]]
      },
      "T, S, and L Keys": {
        debriefMessage: "Type the T key by reaching your index finger up from the F key. If this feels like a long stretch, " +
                        "you may need to to elevate your wrists/palms off the keyboard. Keeping your wrists up is an important " +
                        "ergonomic technique, helping with both speed and injury prevention!",
        lessonContent: [["f ttt f ttt f ttt f ttt f ttt f ttt f ttt f ttt"], ["ftt ftt ftt ftt ftt ftt ftf ftf ftf ftf ftf ftf"], ["ftt ftt ftt ftt ftt ftt tft tft tft tft tft tft"]]
      },
      "O, B, and A Keys": {
        debriefMessage: "Type the O key by reaching your ring finger up. Try not to laugh during this screen!",
        lessonContent: [["l ooo l ooo l ooo l ooo l ooo l ooo l ooo l ooo"], ["ooo lll ooo lll ooo lll lol lol lol lol lol lol"], ["ool ool ool llo llo llo olo olo olo olo olo olo"]]
      },
      "V, H, and M Keys": {
        debriefMessage: "Type the V key with your index finger.",
        lessonContent: [["f vvv f vvv f vvv f vvv f vvv f vvv f vvv f vvv"], ["fvv fvv fvv fvv fvv fvv fvf fvf fvf fvf fvf fvf"], ["vvf vvf vvf vvf vvf vvf vfv vfv vfv vfv vfv vfv"]]
      },
      "Period and Comma": {
        debriefMessage: "Type the , (comma) key with your middle finger. This can feel really awkward, but it will become natural as you practice. \
                          Remember to always bring your finger back to the K key.",
        lessonContent: [["k ,,, k ,,, k ,,, k ,,, k ,,, k ,,, k ,,, k ,,,"], ["k,, k,, k,, k,, k,, k,, k,k k,k k,k k,k k,k k,k"], [",,k ,,k ,,k ,,k ,,k ,,k ,k, ,k, ,k, ,k, ,k, ,k,"]]
      },
      "Beginner Review 2": {
        debriefMessage: "Now that you've learned a dozen more letters, we are going to review! Always keep your eyes on the screen, and do your best to remember where the key is without looking. \
                        If you are having trouble with the Bottom Row keys, try moving your chair back and elevating your wrists a bit.",
        lessonContent: [["ab ae ah ai al am as a. ba be i. bo eh el em es"], ["ha h. hi hm il is it la le li o. ma me mi mo oe"]]
      },
      "W, X and ; Keys": {
        debriefMessage: "Type the W key with your left hand's ring finger. \
                          Don't forget to bring it back to the S key!",
        lessonContent: [["s www s www s www s www s www s www s www s www"], ["sww sww sww sww sww sww sww sws sws sws sws sws"], ["wws wws wws wws wws wws wws wsw wsw wsw wsw wsw"]]
      },
      "Q, Y, and P Keys": {
        debriefMessage: "Type the Q key with your pinky.",
        lessonContent: [["a qqq a qqq a qqq a qqq a qqq a qqq a qqq a qqq"], ["aqq aqq aqq aqq aqq aqq aqa aqa aqa aqa aqa aqa"], ["aaq aaq aaq aaq aaq aaq qaq qaq qaq qaq qaq qaq"]]
      },
      "Z and Enter Keys": {
        debriefMessage: "The last letter of the keyboard! Type the Z key by bringing your pinky down from the A key.",
        lessonContent: [["a zzz a zzz a zzz a zzz a zzz a zzz a zzz a zzz"], ["azz azz azz azz azz azz aza aza aza aza aza aza"], ["zza zza zza zza zza zza zaz zaz zaz zaz zaz zaz"]]
      },
      "Beginner Wrap Up": {
        debriefMessage: "So you've made it this far eh? Great job! This is your final test before moving on to the Intermediate Course. This lesson is going to challenge everything you've learned so far, " +
                          "starting with the Home Row, and moving into full sentences! \
                          Remember, only move the finger required for the key stroke. Do not let those other fingers wander about the keyboard. They should always rest lightly on the Home Row.",
        lessonContent: [["jjj fff jjj fff jjj fff jj ff jjf ffj jjf fjf"], ["ddd kkk ddd kkd ddd kkk dd kk ddk kkd ddk kdk"],
                        ["sss lll sss lll sss lll ss ll ssl lls ssl lsl"], ["aaa ;;; aaa ;;; aaa ;;; aaa ;;; aa ;; aa; ;;a"],
                        ["ggg hhh ggg hhh ggg hhh gg hh ggh hhg ggh hgh"]]
      }
    },
  },
  Intermediate: {
    buttonDropDownLessons: [
      "Common English Words",
      "Easy Home Row Words",
      "Easy Top Row Words",
      "Easy Bottom Row Words",
      "Shift Key and Capitalization",
      "Sentences",
      "Speed Drills",
      "Basic Punctuation",
      "Paragraphs",
      "Advanced Punctuation",
      "Intermediate Wrap Up"
    ],
    lessons: {
      "Common English Words": {
        debriefMessage: "At this point, you should have a solid grasp of all the letters in the alphabet. Time to move on to words! \
                          We will begin by introducing the 100 most common English words.",
        lessonContent: [["the of to and a in is it you that he was for on"]]
      },
      "Easy Home Row Words": {
        debriefMessage: "Home row, home row, home row. We've said it before, and we'll say it again. Keep your fingers on the Home Row keys: ASDF and JKL;",
        lessonContent: [["add all alley aft agh ask afford ajar adapt arf"], ["ate art app arty awe aww apt arr aught apt award"], ["abs acct among aztec ant am avenue acorn axe ach"]]
      },
      "Easy Top Row Words": {
        debriefMessage: "Now to focus on the Top Row. Tip:Your body posture is extremely important while typing. Sit erect, " +
                        "keep your feet flat on the floor, and your wrists elevated off the desk or keyboard. This helps your accuracy, speed, AND your health.",
        lessonContent: [["quartz quail quart quiver queen"], ["quilt quit quack quell qua"], ["quadev quest quint quaint quab"]]
      },
      "Easy Bottom Row Words": {
        debriefMessage: "Now to focus on the Bottom Row. The Bottom Row has a lot of the less often used letters, so get ready for some weird words! Zebras and xylophones!",
        lessonContent: [["zigzag zebra zero zipper zinnia zoo zithe"], ["zan zala zalad zajar zaddy zamono zakk zah"], ["zomo zanby zabba zamna zaxy zamn"]]
      },
      "Shift Key and Capitalization": {
        debriefMessage: "To type CaPiTaL LeTteRs hold down the Shift key, and press the letter. When typing capital letters, always aim to use the opposite hand for the shift key.",
        lessonContent: [["Jjjj Jjjj Jjjj Jjjj Jjjj Ffff Ffff Ffff Ffff Ffff"], ["jJj jJj jJj jJj jJj jJj fFf fFf fFf fFf fFf fFf"]]
      },
      "Sentences": {
        debriefMessage: "Now that you have a feeling for the keyboard and typing easy words, you will move into full sentences with capitalization. \
                          Take your time and focus on keeping your eyes off of your keyboard!",
        lessonContent: [["Whatever you are, be a good one."]]
      },
      "Speed Drills": {
        debriefMessage: "Time for speed drills! Type these basic sentences as fast as you can, rinse, and repeat!",
        lessonContent: [["The quick brown fox jumped over the lazy dogs."], ["The quick brown fox jumped over the lazy dogs."], ["The quick brown fox jumped over the lazy dogs."]]
      },
      "Basic Punctuation": {
        debriefMessage: "You are now going to learn more basic punctuation. The ' (apostrophe) key is located to the right of the ; (semicolon) key. \
                          Type the ' (apostrophe) key with your right hand's pinky finger.",
        lessonContent: [["; ''' ; ''' ; ''' ; ''' ; ''' ; ''' ; ''' ; ''"], ["''' ;;; ''' ;;; ''' ;;; ;'; ;'; ;'; ;'; ;'; ;';"], ["''; ''; ''; ;;' ;;' ;;' ';' ';' ';' ';' ';' ';'"]]
      },
      "Paragraphs": {
        debriefMessage: "Now that you've got a firm grasp on all the main keys of your keyboard, you will put them all together for some short paragraphs. \
                          Always do your best to keep your eyes on the screen, using your finger's memory to know where to move your fingers!",
        lessonContent: [["Tracy looked at the flag. The flag is red, white,"], ["and blue. It has fifty white stars, seven red"], ["stripes, and six white stripes."]]
      },
      "Advanced Punctuation": {
        debriefMessage: "The ? (question mark) key is typed by holding the left shift key and hitting the / (forward slash) key, located next to the . (period) key.",
        lessonContent: [["; ??? ; ??? ; ??? ; ??? ; ??? ; ??? ; ??? ; ???"], ["??? ;;; ??? ;;; ??? ;;; ;?; ;?; ;?; ;?; ;?; ;?;"], ["??; ??; ??; ;;? ;;? ;;? ?;? ?;? ?;? ?;? ?;? ?;?"]]
      },
      "Intermediate Wrap Up": {
        debriefMessage: "Here you are, at the end of the Intermediate Course. Get through these handful of screens and you're moving to Advanced! That's incredible!",
        lessonContent: [["Dear Sirs,"], ["Thank you for sending the diskettes so promptly."], ["However, the diskettes which you sent are for"], ["soft sectored drives. As I stated in my original"],
                        ["letter my system accepts only ten sector, hard"], ["sectored diskettes. I will return these two boxes"], ["as soon as I receive the correct ones."]]
      }
    }
  },
  Advanced: {
    buttonDropDownLessons: [
      "Skill Builder Drills",
      "Numbers Letters Numbers",
      "Jokes and Laughs",
      "Accuracy Drills",
      "Type Racer",
      "Advanced Symbols",
      "Common Medical Terms",
      "Advanced Wrap Up"
    ],
    lessons: {
      "Skill Builder Drills": {
        debriefMessage: "Now that you are a master of the keyboard, we are going to remove the training wheels. These screens feature long words, and tough punctuation. Have fun!",
        lessonContent: [["a aq aqa qaq j ju juj uju just aqua quest cons"], ["toughs sequence thoughtless staunch gunshots"], ["summer pounce afoul differentiated haircut"]]
      },
      "Numbers Letters Numbers": {
        debriefMessage: "In this lesson, you will learn how to type all the numbers on the top of your keyboard. In the beginning, you will also type the Home Row letter that the finger rests on, before typing the number. " +
                        "Make sure to only move the finger typing, and leave the rest of the fingers resting on the homerow at all times.",
        lessonContent: [["aaa 111 aaa 111 aaa 111 aaa 111 aa1 11a a1a 1a1"], ["sss 222 sss 222 sss 222 sss 222 ss2 22s s2s 2s2"], ["a1 1a a1 1a a1 1a a1 1a a1 1a aa1 11a a1a 1a1"], ["s2 2s s2 2s s2 2s s2 2s s2 2s ss2 22s s2s 2s2"], ["12 21 12 21 12 21 12 21 12 21 112 221 121 212"]]
      },
      "Jokes and Laughs": {
        debriefMessage: "We've included some classic jokes for your enjoyment. LOL! And watch for the different screen titles. They're different ways to say LOL in different languages!",
        lessonContent: [["I just got out of the hospital. I was in a speed"], ["reading accident. I hit a book mark and flew"], ["across the room."]]
      },
      "Accuracy Drills": {
        debriefMessage: "In this lesson you will be typing simple paragraphs containing all the letters of the alphabet, " +
                        "numbers, and special symbols. All screens in this lesson require at least 90% accuracy! So make sure you focus on typing correctly.",
        lessonContent: [["Dear Dan,"], ["Yes, I came out of the corn, back to the city,"], ["both to draw and to do copy on the new cars. To"], ["date I am able to put cash in the bank and bear a"], ["bill or two. The new deed has done it."]]
      },
      "Type Racer": {
        debriefMessage: "Have you played our awesome multiplayer typing game, Type Racer? This lesson features typing screens taken directly from Type Racer!",
        lessonContent: [["Drifting is a style of car racing, local to Japan"], ["where the racer intentionally loses traction of"], ["the car in order to maintain a high speed during"], ["a turn."]]
      },
      "Advanced Symbols": {
        debriefMessage: "This lesson will walk you through the more advanced punctuation that requires the shift key. Good luck!",
        lessonContent: [["a!!! a!!! a!!! a!!! a!!! a!!! a!!! a!!! a!!! a!!!"], ["a!a a!a a!a a!a a!a a!a !a! !a! !a! !a! !a! !a!"]]
      },
      "Common Medical Terms": {
        debriefMessage: "This lesson features very long and difficult to type medical terms to help strengthen your ability " +
                        "to remember the keyboard and not just typing common words.This lesson is also great for medical transcriptionists as you will be seeing these terms very often!",
        lessonContent: [["Abasia Abatement Ablation Acampsia Acanthesthesia"], ["Acroagnosis Acronesthesia Acrocyanosis Acroedema"],
                        ["Acrohyperhydrosis Acrotic Actinocymography"], ["Acupuncture Acute Adrenergic Afebrile Aglutition"]]
      },
      "Advanced Wrap Up": {
        debriefMessage: "Here you are at the end of the Advanced Course. Hopefully you feel extremely comfortable with touch typing, and have seen a solid improvement in your speed, accuracy, and of course you always use proper technique",
        lessonContent: [["You say this survey is monotonous rather than"], ["glorious. You should hurry surely to Vancouver"],
                        ["for some delicious yuletide fare. It seems only"], ["yesterday that I was conscious of being young and"],
                        ["vigorous enough to fly my buoyant plane."]]
      }
    }
  }
};

module.exports = config;