import { TranslationContent, Language } from '../types';

export const translations: Record<Language, TranslationContent> = {
  th: {
    title: 'แบบประเมินความพึงพอใจการประชุมผู้ปกครอง',
    schoolName: 'โรงเรียนสาธิตอุดมศึกษา',
    meetingDate: 'วันเสาร์ที่ 8 พฤศจิกายน 2568',
    role: 'ท่านเป็น',
    roleOptions: { parent: 'ผู้ปกครอง', teacher: 'ครู', student: 'นักเรียน', staff: 'บุคลากร' },
    gradeLevel: 'ระดับ',
    gradeLevelOptions: { kindergarten: 'อนุบาล', elementary: 'ประถมศึกษา', secondary: 'มัธยมศึกษา' },
    programme: 'โปรแกรมการเรียน',
    programmeOptions: { thai: 'ภาษาไทย', english: 'ภาษาอังกฤษ' },
    evaluationHeader: 'แบบประเมินความพึงพอใจ',
    kindergartenEvaluationInfo: 'กรุณาให้คะแนนความพึงพอใจตามระดับต่อไปนี้\n5 = มากที่สุด (Very Satisfied)\u20034 = มาก (Satisfied)\u20033 = ปานกลาง (Neutral)\u20032 = น้อย (Dissatisfied)\u20031 = น้อยที่สุด (Very Dissatisfied)',
    elementaryEvaluationInfo: 'กรุณาให้คะแนนความพึงพอใจตามระดับต่อไปนี้\n5 = มากที่สุด (Very Satisfied)\u20034 = มาก (Satisfied)\u20033 = ปานกลาง (Neutral)\u20032 = น้อย (Dissatisfied)\u20031 = น้อยที่สุด (Very Dissatisfied)',
    secondaryEvaluationInfo: 'กรุณาให้คะแนนความพึงพอใจตามระดับต่อไปนี้\n5 = มากที่สุด (Very Satisfied)\u20034 = มาก (Satisfied)\u20033 = ปานกลาง (Neutral)\u20032 = น้อย (Dissatisfied)\u20031 = น้อยที่สุด (Very Dissatisfied)',
    ratingScale: { 5: 'มากที่สุด', 4: 'มาก', 3: 'ปานกลาง', 2: 'น้อย', 1: 'น้อยที่สุด' },
    questions: {
      default: [
        // Meeting Specific
        'การแจ้งกำหนดการและรายละเอียดการประชุมมีความชัดเจน',
        'การประชุมมีจุดมุ่งหมายและเนื้อหาสาระด้านวิชาการที่ชัดเจน',
        'การนำเสนอข้อมูลผลการเรียนและพฤติกรรมของนักเรียนมีความถูกต้องและเข้าใจง่าย',
        'การสื่อสารระหว่างครูประจำชั้นกับผู้ปกครองชัดเจนและเป็นกันเอง',
        'การชี้แจงแนวทางพัฒนาการเรียนรู้ของนักเรียนเป็นประโยชน์ต่อผู้ปกครอง',
        'ครูสามารถตอบข้อซักถามหรือให้คำแนะนำด้านการเรียนได้อย่างเหมาะสม',
        'ผู้ปกครองได้รับข้อมูลเพียงพอในการสนับสนุนการเรียนที่บ้าน',
        'การมีส่วนร่วมระหว่างครู ผู้ปกครอง และนักเรียนมีความเหมาะสม',
        'การประชุมส่งเสริมความเข้าใจและความร่วมมือระหว่างบ้านกับโรงเรียน',
        // School Activities
        'ท่านได้รับทราบแนวทางหรือรายละเอียดเกี่ยวกับกิจกรรมของโรงเรียนที่จะจัดขึ้นในอนาคต',
        'กิจกรรมของโรงเรียนที่ผ่านมา มีความเหมาะสมและเป็นประโยชน์ต่อผู้เรียน',
        'กิจกรรมของโรงเรียนช่วยสร้างความร่วมมือระหว่างบ้านและโรงเรียน',
        'กิจกรรมของโรงเรียนส่งเสริมคุณลักษณะอันพึงประสงค์ของนักเรียน',
        // Overall
        'ความพึงพอใจโดยรวมต่อการประชุม'
      ],
      kindergarten: [
        'การสื่อสารข้อมูลเกี่ยวกับการประชุมมีความชัดเจนและทั่วถึง',
        'ครูประจำชั้นชี้แจงพัฒนาการของนักเรียนได้ชัดเจนและครอบคลุม (ด้านร่างกาย อารมณ์ สังคม สติปัญญา)',
        'ความเข้าใจในแนวทางการจัดประสบการณ์เรียนรู้สำหรับเด็กปฐมวัย',
        'การสื่อสารระหว่างครูและผู้ปกครองเกี่ยวกับกิจวัตรประจำวันของนักเรียน',
        'ครูให้คำแนะนำที่เป็นประโยชน์ในการส่งเสริมพัฒนาการของบุตรหลานที่บ้าน',
        'การดูแลเอาใจใส่ด้านความปลอดภัยและสุขอนามัยของนักเรียนในโรงเรียน',
        'การแจ้งข้อมูลกิจกรรมเสริมประสบการณ์ต่างๆ ของโรงเรียน',
        'บรรยากาศการประชุมเป็นกันเองและเปิดโอกาสให้ผู้ปกครองซักถาม',
        'ความพึงพอใจโดยรวมต่อการประชุมครั้งนี้',
      ],
      elementary: [
        'การแจ้งข้อมูลข่าวสารและเอกสารประกอบการประชุม',
        'การนำเสนอวาระการประชุมโดยครูประจำชั้น',
        'ความเข้าใจในวาระเกี่ยวกับการเรียน การบ้าน และการประเมินผล',
        'การสื่อสารระหว่างโรงเรียนกับผู้ปกครอง',
        'ความร่วมมือของผู้ปกครองกับโรงเรียน',
        'การชี้แจงเรื่องกิจกรรมภาคเรียนที่ 2/2568',
        'การส่งเสริมวินัย ความรับผิดชอบ และความปลอดภัยของนักเรียน',
        'การสื่อสารเกี่ยวกับสุขภาพและการป้องกันโรค',
        'ความพึงพอใจโดยรวมต่อการประชุมครั้งนี้',
      ],
      secondary: [
        'การชี้แจงผลการเรียนและการประเมินผล',
        'การให้ข้อมูลเกี่ยวกับพฤติกรรมนักเรียนและระเบียบวินัย',
        'การสื่อสารและการใช้ระบบ Student Care Solution',
        'ความเข้าใจในมาตรการป้องกันพฤติกรรมเสี่ยง (บุหรี่ ยาเสพติด โทรศัพท์ ฯลฯ)',
        'การชี้แจงกิจกรรมภาคเรียนที่ 2/2568',
        'การมีส่วนร่วมของผู้ปกครองในการดูแลบุตรหลาน',
        'การสื่อสารระหว่างโรงเรียนและผู้ปกครอง',
        'การจัดประชุมโดยรวม (สถานที่ เวลา บรรยากาศ)',
        'ความพึงพอใจโดยรวมต่อการประชุมครั้งนี้',
      ]
    },
    feedbackHeader: 'ข้อเสนอแนะเพิ่มเติม',
    feedbackLabels: {
      default: {
        positiveFeedback: 'สิ่งที่ท่านพึงพอใจมากที่สุดในการประชุมครั้งนี้คือ',
        improvementFeedback: 'สิ่งที่ควรปรับปรุงหรือเพิ่มเติมในการจัดประชุมครั้งต่อไปคือ',
        activitySuggestions: 'ท่านต้องการให้โรงเรียนจัดกิจกรรมรูปแบบใดเพิ่มเติม',
        otherSuggestions: 'ข้อเสนอแนะอื่น ๆ',
      },
       kindergarten: {
        positiveFeedback: 'สิ่งที่ท่านพึงพอใจมากที่สุด',
        improvementFeedback: 'สิ่งที่ควรปรับปรุง',
        otherSuggestions: 'ข้อเสนอเพิ่มเติม',
      },
      elementary: {
        positiveFeedback: 'สิ่งที่ท่านพึงพอใจมากที่สุด',
        improvementFeedback: 'สิ่งที่ควรปรับปรุง',
        otherSuggestions: 'ข้อเสนอเพิ่มเติม',
      },
      secondary: {
        positiveFeedback: 'สิ่งที่ท่านพึงพอใจมากที่สุด',
        improvementFeedback: 'สิ่งที่ควรปรับปรุง',
        otherSuggestions: 'ข้อเสนอเพิ่มเติม',
      }
    },
    submitButton: 'ส่งแบบประเมิน',
    validation: {
      required: 'กรุณากรอกข้อมูล',
      role: 'กรุณาเลือกว่าท่านเป็นใคร',
      gradeLevel: 'กรุณาเลือกระดับ',
      programme: 'กรุณาเลือกโปรแกรมการเรียน',
      rating: 'กรุณาให้คะแนนหัวข้อนี้'
    },
    alert: {
      successTitle: 'ส่งเรียบร้อย',
      successText: 'ขอบคุณสำหรับความคิดเห็นของท่าน'
    },
    csvHeaders: {
      role: 'สถานะ',
      gradeLevel: 'ระดับ',
      programme: 'โปรแกรม',
      positiveFeedback: 'สิ่งที่พึงพอใจ',
      improvementFeedback: 'สิ่งที่ควรปรับปรุง',
      activitySuggestions: 'ข้อเสนอแนะกิจกรรม',
      otherSuggestions: 'ข้อเสนอแนะอื่น ๆ'
    }
  },
  en: {
    title: 'Parent-Teacher Meeting Satisfaction Survey',
    schoolName: 'Satit Udomseuksa School',
    meetingDate: 'Saturday, 8 November 2025',
    role: 'You are a',
    roleOptions: { parent: 'Parent', teacher: 'Teacher', student: 'Student', staff: 'Staff' },
    gradeLevel: 'Level',
    gradeLevelOptions: { kindergarten: 'Kindergarten', elementary: 'Primary Level', secondary: 'Secondary Level' },
    programme: 'Programme',
    programmeOptions: { thai: 'Thai Programme', english: 'English Programme' },
    evaluationHeader: 'Satisfaction Survey',
    kindergartenEvaluationInfo: 'Please rate your satisfaction according to the following scale.\n5 = Very Satisfied (มากที่สุด)\u20034 = Satisfied (มาก)\u20033 = Neutral (ปานกลาง)\u20032 = Dissatisfied (น้อย)\u20031 = Very Dissatisfied (น้อยที่สุด)',
    elementaryEvaluationInfo: 'Please rate your satisfaction according to the following scale.\n5 = Very Satisfied (มากที่สุด)\u20034 = Satisfied (มาก)\u20033 = Neutral (ปานกลาง)\u20032 = Dissatisfied (น้อย)\u20031 = Very Dissatisfied (น้อยที่สุด)',
    secondaryEvaluationInfo: 'Please rate your satisfaction according to the following scale.\n5 = Very Satisfied (มากที่สุด)\u20034 = Satisfied (มาก)\u20033 = Neutral (ปานกลาง)\u20032 = Dissatisfied (น้อย)\u20031 = Very Dissatisfied (น้อยที่สุด)',
    ratingScale: { 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Fair', 1: 'Poor' },
    questions: {
      default: [
        // Meeting Specific
        'The meeting schedule and details were clearly communicated.',
        'The meeting had a clear academic purpose and content.',
        'Student performance and behavior data were presented accurately and clearly.',
        'Communication between the homeroom teacher and parents was clear and friendly.',
        'The guidance on student learning development was helpful to parents.',
        'The teacher effectively answered questions and provided academic advice.',
        'Parents received sufficient information to support learning at home.',
        'The level of participation among teachers, parents, and students was appropriate.',
        'The meeting promoted understanding and cooperation between home and school.',
        // School Activities
        'You have been informed about upcoming school activities and plans.',
        'School activities conducted so far were appropriate and beneficial for students.',
        'School activities promote cooperation between home and school.',
        'School activities enhance desirable characteristics and values in students.',
        // Overall
        'Overall satisfaction with the meeting.'
      ],
      kindergarten: [
        'Communication about the meeting was clear and comprehensive.',
        "The homeroom teacher clearly explained the student's development (physical, emotional, social, cognitive).",
        "Understanding of the school's approach to early childhood learning experiences.",
        "Communication between teachers and parents regarding the student's daily routine.",
        "The teacher provided useful advice for supporting the child's development at home.",
        'Attention to student safety, health, and hygiene at school.',
        'Information provided about extra-curricular and experiential activities.',
        'The meeting atmosphere was friendly and encouraged parent questions.',
        'Overall satisfaction with this meeting.',
      ],
      elementary: [
        'Clarity of meeting documents and information provided',
        'Presentation by homeroom teacher',
        'Understanding of learning and assessment issues',
        'Communication between school and parents',
        'Parent-school cooperation',
        'Clarity of upcoming semester activities',
        'Discipline, responsibility, and student safety measures',
        'Communication on health and hygiene',
        'Overall satisfaction with the meeting',
      ],
      secondary: [
        'Clarity on student performance and assessment',
        'Discussion of student behavior and school regulations',
        'Communication and Student Care Solution system',
        'Understanding of preventive measures on risky behaviors (cigarettes, drugs, phones, etc.)',
        'Explanation of Semester 2 activities',
        'Parental involvement and cooperation',
        'Communication between school and parents',
        'Meeting organization (venue, time, atmosphere)',
        'Overall satisfaction with the meeting',
      ]
    },
    feedbackHeader: 'Additional Feedback',
    feedbackLabels: {
      default: {
        positiveFeedback: 'What were you most satisfied with in this meeting?',
        improvementFeedback: 'What should be improved or added for the next meeting?',
        activitySuggestions: 'What additional school activities would you like the school to organize?',
        otherSuggestions: 'Other suggestions',
      },
      kindergarten: {
        positiveFeedback: 'What did you like most?',
        improvementFeedback: 'What should be improved?',
        otherSuggestions: 'Additional comments',
      },
      elementary: {
        positiveFeedback: 'What did you like most?',
        improvementFeedback: 'What should be improved?',
        otherSuggestions: 'Additional comments',
      },
      secondary: {
        positiveFeedback: 'What did you like most?',
        improvementFeedback: 'What should be improved?',
        otherSuggestions: 'Additional comments',
      }
    },
    submitButton: 'Submit Survey',
    validation: {
      required: 'This field is required',
      role: 'Please select your role',
      gradeLevel: 'Please select a level',
      programme: 'Please select a programme',
      rating: 'Please rate this item'
    },
    alert: {
      successTitle: 'Submitted Successfully',
      successText: 'Thank you for your feedback.'
    },
    csvHeaders: {
        role: 'Role',
        gradeLevel: 'Level',
        programme: 'Programme',
        positiveFeedback: 'Positive Feedback',
        improvementFeedback: 'Improvement Feedback',
        activitySuggestions: 'Activity Suggestions',
        otherSuggestions: 'Other Suggestions'
    }
  }
};