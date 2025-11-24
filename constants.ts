
import { Myth, QuizQuestion, Scenario } from './types';

// 重要：請將此處的連結替換為您的 Google 表單連結
// IMPORTANT: Replace this link with your actual Google Form URL
export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScEjtLsZjobQyOZORZgvXB3U1KuucFsb-9TOWqibwhAT1c0Rg/viewform?usp=header"; 

export const PDF_CONTEXT = `
You are a helpful assistant explaining Autism Spectrum Disorder (ASD).
Please answer in Traditional Chinese, English, and Vietnamese.

Key Definitions:
- ASD is caused by abnormalities in neuropsychological functioning.
- Characteristics: Significant difficulties in social interaction/communication, and restricted/repetitive patterns of behavior/interests.
- Social Difficulties: Trouble with facial expressions, eye contact, body language, understanding social rules.
- Repetitive Behaviors: Rocking, repeating words, specific routines, anxiety when disrupted, strong interests.

Myths vs Facts:
1. Hereditary: Genes play a role, but not strictly hereditary. ~5% chance for siblings.
2. Mental Illness: No, it is a developmental disorder.
3. Medication: No cure. Meds only help symptoms like anxiety.
4. Geniuses: Savant syndrome exists but is rare.
5. Don't want friends: False. They want friends but express it differently.

Support Strategies:
- Predictability: Plan ahead, avoid surprises, use visual schedules.
- Clear Instruction: Direct language, no metaphors/slang.
- Positive Reinforcement: Timely feedback.
`;

export const MYTHS: Myth[] = [
  {
    id: 1,
    statement: {
      zh: "自閉症是一種精神疾病。",
      en: "Autism is a type of mental illness.",
      vi: "Tự kỷ là một loại bệnh tâm thần."
    },
    isTrue: false,
    explanation: {
      zh: "自閉症是一種發展障礙，影響人如何理解世界。它與一般的精神疾病不同。",
      en: "Autism is a developmental disorder affecting how a person understands the world. It differs from typical mental illnesses.",
      vi: "Tự kỷ là một rối loạn phát triển ảnh hưởng đến cách một người hiểu thế giới. Nó khác với các bệnh tâm thần điển hình."
    }
  },
  {
    id: 2,
    statement: {
      zh: "自閉症患者不想交朋友。",
      en: "People with autism don't want to make friends.",
      vi: "Người tự kỷ không muốn kết bạn."
    },
    isTrue: false,
    explanation: {
      zh: "大多數自閉症患者都想建立社交關係，只是他們表達渴望和互動的方式不同。",
      en: "Most individuals with autism DO want social relationships; they just express this desire and interact in different ways.",
      vi: "Hầu hết những người mắc chứng tự kỷ ĐỀU muốn có các mối quan hệ xã hội; họ chỉ thể hiện mong muốn này và tương tác theo những cách khác nhau."
    }
  },
  {
    id: 3,
    statement: {
      zh: "所有自閉症患者都是天才（學者症候群）。",
      en: "All people with autism are geniuses (Savant Syndrome).",
      vi: "Tất cả những người mắc chứng tự kỷ đều là thiên tài (Hội chứng Savant)."
    },
    isTrue: false,
    explanation: {
      zh: "學者症候群（在音樂/數學方面有特殊才能）非常罕見。大多數自閉症患者的能力範圍很廣，就像其他人一樣。",
      en: "Savant syndrome (exceptional skills in music/math) is very rare. Most people with autism have a wide range of abilities like anyone else.",
      vi: "Hội chứng Savant (kỹ năng đặc biệt về âm nhạc/toán học) rất hiếm. Hầu hết những người mắc chứng tự kỷ đều có nhiều khả năng giống như bất kỳ ai khác."
    }
  },
  {
    id: 4,
    statement: {
      zh: "如果一個孩子有自閉症，下一個兄弟姐妹一定會有。",
      en: "If one child has autism, the next sibling will definitely have it.",
      vi: "Nếu một đứa trẻ mắc chứng tự kỷ, anh chị em tiếp theo chắc chắn sẽ mắc chứng này."
    },
    isTrue: false,
    explanation: {
      zh: "不一定。研究表明兄弟姐妹的機率約為 5%。這涉及複雜的遺傳因素，並非簡單的遺傳。",
      en: "Not definitely. Research indicates about a 5% chance for siblings. It involves complex genetic factors but isn't strictly hereditary.",
      vi: "Không chắc chắn. Nghiên cứu chỉ ra khoảng 5% cơ hội cho anh chị em ruột. Nó liên quan đến các yếu tố di truyền phức tạp nhưng không hoàn toàn do di truyền."
    }
  },
  {
    id: 5,
    statement: {
      zh: "自閉症會傳染？",
      en: "Is autism contagious?",
      vi: "Tự kỷ có lây không?"
    },
    isTrue: false,
    explanation: {
      zh: "否。自閉症不是傳染病，是神經發展特徵。",
      en: "No. Autism is not an infectious disease; it is a neurodevelopmental trait.",
      vi: "Không. Tự kỷ không phải là bệnh truyền nhiễm; đó là một đặc điểm phát triển thần kinh."
    }
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: {
      zh: "隱喻的陷阱",
      en: "The Metaphor Trap",
      vi: "Cạm bẫy ẩn dụ"
    },
    description: {
      zh: "你想讓一位自閉症學生停止在走廊奔跑。最好的說法是什麼？",
      en: "You want a student with autism to stop running in the hallway. What is the best way to say it?",
      vi: "Bạn muốn một học sinh tự kỷ ngừng chạy ở hành lang. Cách tốt nhất để nói điều đó là gì?"
    },
    options: [
      {
        text: {
          zh: "別鬧了！ (Cut it out!)",
          en: "Cut it out!",
          vi: "Thôi đi!"
        },
        isCorrect: false,
        feedback: {
          zh: "這是成語/俚語。自閉症學生通常按字面意思理解語言，可能聽不懂。",
          en: "This is an idiom. Students with autism often interpret language literally.",
          vi: "Đây là một thành ngữ. Học sinh tự kỷ thường diễn giải ngôn ngữ theo nghĩa đen."
        }
      },
      {
        text: {
          zh: "請用走的。",
          en: "Please walk.",
          vi: "Làm ơn đi bộ."
        },
        isCorrect: true,
        feedback: {
          zh: "太棒了！直接、清晰、沒有歧義的指令是最好的。",
          en: "Perfect! Direct, clear instructions without ambiguity are best.",
          vi: "Hoàn hảo! Hướng dẫn trực tiếp, rõ ràng và không gây mơ hồ là tốt nhất."
        }
      },
      {
        text: {
          zh: "我們是在賽車場嗎？",
          en: "Are we in a race track?",
          vi: "Chúng ta đang ở trường đua à?"
        },
        isCorrect: false,
        feedback: {
          zh: "諷刺或反問可能會令人困惑。最好直接說明你希望他們做什麼。",
          en: "Sarcasm or rhetorical questions can be confusing. Directness is better.",
          vi: "Sự mỉa mai hoặc những câu hỏi tu từ có thể gây nhầm lẫn. Sự trực tiếp thì tốt hơn."
        }
      }
    ]
  },
  {
    id: 2,
    title: {
      zh: "改變計畫",
      en: "Change of Plans",
      vi: "Thay đổi kế hoạch"
    },
    description: {
      zh: "班級通常週二去圖書館，但今天閉館。你該如何處理？",
      en: "The class usually goes to the library on Tuesdays, but today it's closed. How do you handle this?",
      vi: "Lớp học thường đến thư viện vào thứ Ba, nhưng hôm nay thư viện đóng cửa. Bạn xử lý việc này như thế nào?"
    },
    options: [
      {
        text: {
          zh: "直到圖書館門口才說。",
          en: "Don't say anything until you get to the library door.",
          vi: "Đừng nói gì cho đến khi bạn đến cửa thư viện."
        },
        isCorrect: false,
        feedback: {
          zh: "突然的改變會引起極大的焦慮。可預測性是關鍵。",
          en: "Sudden changes can cause significant anxiety. Predictability is key.",
          vi: "Những thay đổi đột ngột có thể gây ra sự lo lắng đáng kể. Khả năng dự đoán là chìa khóa."
        }
      },
      {
        text: {
          zh: "提早告知，並出示新活動的視覺卡。",
          en: "Tell them early and show a visual card of the new activity.",
          vi: "Nói với họ sớm và đưa ra thẻ trực quan về hoạt động mới."
        },
        isCorrect: true,
        feedback: {
          zh: "正確！提前告知並使用視覺輔助工具有助於減少對意外變化的焦慮。",
          en: "Correct! Informing them ahead of time and using visual aids helps reduce anxiety.",
          vi: "Đúng! Thông báo trước cho họ và sử dụng các phương tiện hỗ trợ trực quan giúp giảm bớt lo lắng."
        }
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: {
      zh: "以下哪項是自閉症譜系障礙的核心特徵？",
      en: "Which of the following is a core characteristic of Autism Spectrum Disorder?",
      vi: "Đặc điểm nào sau đây là đặc điểm cốt lõi của Rối loạn phổ tự kỷ?"
    },
    options: [
      { zh: "優秀的社交直覺", en: "Excellent social intuition", vi: "Trực giác xã hội xuất sắc" },
      { zh: "侷限且重複的行為或興趣模式", en: "Restricted and repetitive patterns of behavior or interests", vi: "Các mô hình hành vi hoặc sở thích bị hạn chế và lặp đi lặp lại" },
      { zh: "完全缺乏情感", en: "Complete lack of emotion", vi: "Hoàn toàn thiếu cảm xúc" },
      { zh: "生理上無法說話", en: "Physical inability to speak", vi: "Không có khả năng nói về mặt thể chất" }
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: {
      zh: "為了支持患有自閉症的朋友，你應該使用：",
      en: "To support a friend with autism, you should use:",
      vi: "Để hỗ trợ một người bạn mắc chứng tự kỷ, bạn nên sử dụng:"
    },
    options: [
      { zh: "一次給予多個指令", en: "Many instructions at once", vi: "Nhiều hướng dẫn cùng một lúc" },
      { zh: "大量的笑話和諷刺", en: "Lots of jokes and sarcasm", vi: "Rất nhiều câu chuyện cười và sự mỉa mai" },
      { zh: "清晰、直接的語言", en: "Clear, direct language", vi: "Ngôn ngữ rõ ràng, trực tiếp" },
      { zh: "模糊的暗示", en: "Vague hints", vi: "Những gợi ý mơ hồ" }
    ],
    correctIndex: 2
  },
  {
    id: 3,
    question: {
      zh: "藥物可以治癒自閉症嗎？",
      en: "Can medication cure autism?",
      vi: "Thuốc có thể chữa khỏi bệnh tự kỷ không?"
    },
    options: [
      { zh: "可以，抗生素可以治癒", en: "Yes, antibiotics cure it", vi: "Có, thuốc kháng sinh chữa khỏi được" },
      { zh: "不，目前無法治癒，但藥物可緩解症狀", en: "No, there is currently no cure, but meds can help with symptoms", vi: "Không, hiện chưa có cách chữa trị, nhưng thuốc có thể giúp giảm triệu chứng" },
      { zh: "可以，透過手術", en: "Yes, with surgery", vi: "Được, bằng" }
    ],
    correctIndex: 1
  }
];
