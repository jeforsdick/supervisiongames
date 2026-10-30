// Original educational scenarios; not reproduced from commercial study materials.
const ESCAPE_CONTENT={
  "title": "The Behavior Lab: Escape Protocol",
  "rooms": [
    {
      "title": "The Observation Chamber",
      "subtitle": "Measurement and Data Display",
      "tco": "C",
      "icon": "📊",
      "story": "The observation monitors have gone dark. Restore the measurement system to reveal the first access digit.",
      "puzzles": [
        {
          "type": "choice",
          "prompt": "A teacher records how many seconds pass between an instruction and the student's first response. Which measure is this?",
          "options": [
            "Duration",
            "Latency",
            "Interresponse time",
            "Response rate"
          ],
          "answer": 1,
          "explain": "Latency measures elapsed time from an antecedent event to response onset.",
          "hint": "Look at the time between the instruction and when the behavior begins."
        },
        {
          "type": "choice",
          "prompt": "A student engages in a response during 4 of 10 partial intervals. Which statement is justified?",
          "options": [
            "The response occupied exactly 40% of observation time",
            "The response occurred during at least part of 40% of intervals",
            "The student emitted exactly four responses",
            "The total duration was four minutes"
          ],
          "answer": 1,
          "explain": "Partial-interval data indicate the percentage of intervals in which behavior occurred, not exact duration or count.",
          "hint": "Partial-interval recording tells you whether a behavior occurred at any point in each interval."
        },
        {
          "type": "choice",
          "prompt": "Nora's observation report shows out-of-seat episodes during independent work. Which conclusion is most defensible from this observation alone?",
          "options": [
            "Nora's behavior is definitely maintained by escape",
            "Nora's behavior is definitely maintained by attention",
            "The observation documents when behavior occurred, but does not establish its function",
            "The behavior should immediately be placed on extinction"
          ],
          "answer": 2,
          "explain": "Descriptive observation can identify patterns and generate hypotheses, but it does not experimentally demonstrate behavioral function. The team should integrate other assessment information before selecting a function-based intervention.",
          "hint": "Ask whether watching behavior is enough to establish the maintaining contingency."
        }
      ],
      "digit": "7"
    },
    {
      "title": "The Function Files",
      "subtitle": "Behavioral Assessment",
      "tco": "F",
      "icon": "🗂️",
      "story": "A locked cabinet holds a student's assessment records. Determine the most defensible function-based interpretation.",
      "puzzles": [
        {
          "type": "choice",
          "prompt": "During difficult tasks, a student throws materials. The teacher removes the assignment, and throwing becomes more likely. What consequence may be maintaining throwing?",
          "options": [
            "Positive reinforcement through attention",
            "Negative reinforcement through task removal",
            "Automatic positive reinforcement",
            "Response cost"
          ],
          "answer": 1,
          "explain": "If task removal follows throwing and increases its future occurrence, escape is functioning as negative reinforcement.",
          "hint": "Focus on what is removed after the response."
        },
        {
          "type": "choice",
          "prompt": "A team interviews staff, reviews records, and observes ABC patterns without arranging experimental conditions. Which statement is best?",
          "options": [
            "They have experimentally demonstrated function",
            "They have gathered indirect and descriptive assessment information",
            "They have completed a component analysis",
            "They have established reinforcer efficacy"
          ],
          "answer": 1,
          "explain": "Interviews and naturally occurring ABC observations generate hypotheses; they do not experimentally establish function.",
          "hint": "Was the environment deliberately manipulated to test the hypothesis?"
        },
        {
          "type": "choice",
          "prompt": "Which assessment would most directly test whether task removal maintains the response?",
          "options": [
            "A preference assessment",
            "A functional analysis with relevant test and control conditions",
            "A curriculum-based assessment",
            "A treatment acceptability questionnaire"
          ],
          "answer": 1,
          "explain": "A properly designed functional analysis manipulates relevant antecedents and consequences to evaluate behavioral function.",
          "hint": "Look for an assessment that tests the relation, not just describes it."
        }
      ],
      "digit": "3"
    },
    {
      "title": "The Intervention Vault",
      "subtitle": "Behavior-Change Procedures",
      "tco": "G",
      "icon": "🧪",
      "story": "The intervention console requires three decisions before its containment lock will release.",
      "puzzles": [
        {
          "type": "choice",
          "prompt": "A learner engages in disruption to escape lengthy worksheets. Which alternative response best matches a function-based FCT plan?",
          "options": [
            "Request a brief break appropriately",
            "Say 'thank you' after finishing",
            "Sit quietly without any assistance",
            "Earn unrelated stickers for attendance"
          ],
          "answer": 0,
          "explain": "Functional communication training teaches an appropriate response that accesses the same functional reinforcer, such as a break.",
          "hint": "The replacement response should access the same outcome as the problem behavior."
        },
        {
          "type": "choice",
          "prompt": "A supervisor reinforces increasingly accurate approximations of a new vocal response. Which procedure is being used?",
          "options": [
            "Chaining",
            "Shaping",
            "Extinction",
            "Overcorrection"
          ],
          "answer": 1,
          "explain": "Shaping uses differential reinforcement of successive approximations toward a target response.",
          "hint": "The response form changes gradually across reinforced approximations."
        },
        {
          "type": "choice",
          "prompt": "After teaching with a physical prompt, the practitioner systematically reduces assistance until the natural cue controls responding. What is this?",
          "options": [
            "Prompt fading",
            "Response blocking",
            "Noncontingent reinforcement",
            "Abolishing operation"
          ],
          "answer": 0,
          "explain": "Prompt fading systematically reduces supplemental prompts to transfer control to the intended stimuli.",
          "hint": "The extra assistance is gradually removed."
        }
      ],
      "digit": "1"
    },
    {
      "title": "The Research Wing",
      "subtitle": "Experimental Design",
      "tco": "D",
      "icon": "📈",
      "story": "The research terminal demands evidence, not guesses. Identify designs and threats to experimental control.",
      "puzzles": [
        {
          "type": "choice",
          "prompt": "An intervention starts at different times across three classrooms, with change occurring only after introduction in each. Which design is described?",
          "options": [
            "Alternating-treatments",
            "Multiple-baseline",
            "Changing-criterion",
            "Simple pre-post"
          ],
          "answer": 1,
          "explain": "A multiple-baseline design staggers intervention onset across tiers and evaluates replicated changes.",
          "hint": "Look for staggered starts across different tiers."
        },
        {
          "type": "choice",
          "prompt": "A team rapidly alternates two instructional procedures to compare performance. Which design is most appropriate?",
          "options": [
            "Reversal",
            "Alternating-treatments",
            "Multiple-probe",
            "Changing-criterion"
          ],
          "answer": 1,
          "explain": "Alternating-treatments designs compare conditions through rapid alternation.",
          "hint": "The procedures switch back and forth frequently."
        },
        {
          "type": "choice",
          "prompt": "A treatment package contains prompts, reinforcement, and self-monitoring. Which analysis helps identify the contribution of individual components?",
          "options": [
            "Component analysis",
            "Functional analysis",
            "Preference assessment",
            "Scatterplot assessment"
          ],
          "answer": 0,
          "explain": "Component analyses evaluate the effects of individual elements of a multicomponent intervention.",
          "hint": "You are separating parts of a package to see what each contributes."
        }
      ],
      "digit": "9"
    },
    {
      "title": "The Ethics Control Room",
      "subtitle": "Ethics and Supervision",
      "tco": "E & I",
      "icon": "🛡️",
      "story": "One final safeguard remains. Restore ethical oversight to unlock the facility exit.",
      "puzzles": [
        {
          "type": "choice",
          "prompt": "A supervisee can accurately describe a procedure but cannot implement it because required materials are unavailable. What should the supervisor address first?",
          "options": [
            "Repeat lecture-based training",
            "Assess and resolve the environmental barrier",
            "Assume the supervisee lacks motivation",
            "Increase the complexity of the procedure"
          ],
          "answer": 1,
          "explain": "Performance problems can reflect environmental barriers; retraining alone does not provide missing materials.",
          "hint": "Is the barrier a skill deficit, or is something needed for performance missing?"
        },
        {
          "type": "choice",
          "prompt": "A supervisor teaches a skill through instruction, demonstration, practice, and performance feedback. What training package is this?",
          "options": [
            "Behavioral skills training",
            "A descriptive assessment",
            "A component analysis",
            "Noncontingent reinforcement"
          ],
          "answer": 0,
          "explain": "Behavioral skills training includes instruction, modeling, rehearsal, and feedback.",
          "hint": "Think of the four-part training sequence."
        },
        {
          "type": "choice",
          "prompt": "A practitioner is asked to deliver a specialized service outside their current competence. What is the best initial response?",
          "options": [
            "Accept and learn entirely through trial and error",
            "Seek appropriate training, consultation, or referral before practicing independently",
            "Ignore the request without discussion",
            "Delegate all decisions to an untrained supervisee"
          ],
          "answer": 1,
          "explain": "Practitioners should work within their competence and obtain training, consultation, or make an appropriate referral.",
          "hint": "Consider professional competence and client protection."
        }
      ],
      "digit": "4"
    }
  ]
};
