/**
 * Exercise catalogue — the single source of truth for every card on the page.
 *
 * Poses are authored in SVG-style units (origin top-left, y grows down, the floor sits at
 * y = 150 and x = 150 is the centre) as side-on stick-figure joints. The figure animates
 * between `start` and `end`. Far-side limbs (farElbow ... farToe) are optional and default
 * to the near-side joint.
 *
 * glow: which regions light up red while that exercise works them.
 *   'torso' = spine/abdominals, 'hips' = pelvis and thighs.
 * cycle: seconds for one full rep of the loop.
 * spineBend: optional [start, end] vertical offset of the spine curve (cat-cow).
 */
export const exercises = [
  {
    id: "mcgill-curl-up",
    phase: 1,
    name: "McGill curl-up",
    dose: "3 sets of 8 reps, hold each lift for 7 seconds",
    muscles: "Rectus abdominis, deep abdominal wall",
    glow: ["torso"],
    cycle: 4,
    poses: {
      start: {
        head: [192, 130], shoulder: [174, 131], elbow: [156, 135], wrist: [138, 137], hip: [130, 132], knee: [100, 96], ankle: [76, 132], toe: [62, 134],
        farElbow: [156, 135], farWrist: [138, 137], farKnee: [90, 133], farAnkle: [50, 135], farToe: [42, 132],
      },
      end: {
        head: [190, 110], shoulder: [172, 120], elbow: [156, 135], wrist: [138, 137], hip: [130, 132], knee: [100, 96], ankle: [76, 132], toe: [62, 134],
        farElbow: [156, 135], farWrist: [138, 137], farKnee: [90, 133], farAnkle: [50, 135], farToe: [42, 132],
      },
    },
    steps: [
      "Lie on your back, one knee bent and the other leg straight.",
      "Place both hands palms down under the curve of your lower back.",
      "Brace your abdomen as if bracing for a light punch, then lift only your head and shoulders about 5 cm. Do not bend at the spine.",
      "Hold 7 seconds while breathing in small breaths, lower, then swap the bent leg after each set.",
    ],
    mistakes: "pulling the chin to the chest, flattening the back into the hands, sitting all the way up.",
  },
  {
    id: "side-plank",
    phase: 1,
    name: "Side plank",
    dose: "3 sets of 20 seconds per side. Progress by 5 seconds per week",
    muscles: "Obliques, quadratus lumborum, glute medius",
    glow: ["torso", "hips"],
    cycle: 4,
    poses: {
      start: {
        head: [80, 114], shoulder: [100, 114], elbow: [100, 140], wrist: [124, 141], hip: [184, 134], knee: [228, 138], ankle: [266, 141], toe: [274, 142],
        farElbow: [130, 100], farWrist: [178, 126], farKnee: [232, 135], farAnkle: [268, 139], farToe: [276, 140],
      },
      end: {
        head: [82, 104], shoulder: [100, 108], elbow: [100, 138], wrist: [124, 141], hip: [184, 121], knee: [228, 130], ankle: [266, 138], toe: [274, 141],
        farElbow: [128, 94], farWrist: [176, 112], farKnee: [230, 128], farAnkle: [268, 135], farToe: [276, 138],
      },
    },
    steps: [
      "Lie on your side with your elbow directly under your shoulder and knees bent at 90 degrees (the easier version, which suits you now).",
      "Lift your hips until shoulder, hip and knee form one straight line.",
      "Keep the top hand on your hip and your ribs stacked, without letting the hips roll back.",
      "Hold, breathing steadily. Lower, then repeat on the other side.",
    ],
    mistakes: "hips sagging, hips pushed forward, holding your breath.",
  },
  {
    id: "bird-dog",
    phase: 1,
    name: "Bird dog",
    dose: "3 sets of 8 reps per side, 5-second hold each rep",
    muscles: "Spinal erectors, multifidus, glutes",
    glow: ["torso", "hips"],
    cycle: 5,
    poses: {
      start: {
        head: [194, 98], shoulder: [172, 106], elbow: [173, 126], wrist: [174, 146], hip: [112, 106], knee: [112, 146], ankle: [76, 146], toe: [66, 146],
        farElbow: [178, 126], farWrist: [179, 146], farKnee: [117, 146], farAnkle: [81, 146], farToe: [71, 146],
      },
      end: {
        head: [196, 96], shoulder: [172, 106], elbow: [204, 106], wrist: [236, 104], hip: [112, 106], knee: [112, 146], ankle: [76, 146], toe: [66, 146],
        farElbow: [178, 126], farWrist: [179, 146], farKnee: [80, 104], farAnkle: [44, 102], farToe: [36, 106],
      },
    },
    steps: [
      "Start on hands and knees, hands under shoulders and knees under hips.",
      "Brace your abdomen and keep your back flat, as if a glass of water sat on it.",
      "Reach one arm forward and the opposite leg straight back at the same time, and stop at hip height.",
      "Hold 5 seconds, return with control, then switch sides.",
    ],
    mistakes: "arching the lower back, lifting the leg above hip height, rotating the hips.",
  },
  {
    id: "glute-bridge",
    phase: 1,
    name: "Glute bridge",
    dose: "3 sets of 12 reps with a 2-second squeeze at the top",
    muscles: "Gluteus maximus, hamstrings",
    glow: ["hips"],
    cycle: 4,
    poses: {
      start: {
        head: [44, 134], shoulder: [68, 133], elbow: [94, 136], wrist: [118, 138], hip: [136, 134], knee: [168, 104], ankle: [190, 134], toe: [204, 136],
      },
      end: {
        head: [44, 134], shoulder: [68, 132], elbow: [94, 136], wrist: [118, 138], hip: [130, 110], knee: [170, 98], ankle: [190, 134], toe: [204, 136],
      },
    },
    steps: [
      "Lie on your back with knees bent and feet flat, hip-width apart.",
      "Press through your heels and squeeze your glutes to lift your hips.",
      "Stop when shoulders, hips and knees form a straight line, without arching your lower back.",
      "Hold 2 seconds and lower slowly.",
    ],
    mistakes: "pushing up with the lower back, feet too far away, hamstring cramping (move your feet closer).",
  },
  {
    id: "cat-cow",
    phase: 1,
    name: "Cat-cow",
    dose: "2 sets of 10 slow cycles, one breath per movement",
    muscles: "Spinal mobility, abdominals and spinal extensors in turn",
    glow: ["torso"],
    cycle: 5,
    spineBend: [30, -36],
    poses: {
      start: {
        head: [198, 90], shoulder: [172, 106], elbow: [173, 126], wrist: [174, 146], hip: [112, 106], knee: [112, 146], ankle: [76, 146], toe: [66, 146],
        farElbow: [178, 126], farWrist: [179, 146], farKnee: [117, 146], farAnkle: [81, 146], farToe: [71, 146],
      },
      end: {
        head: [184, 120], shoulder: [172, 106], elbow: [173, 126], wrist: [174, 146], hip: [112, 106], knee: [112, 146], ankle: [76, 146], toe: [66, 146],
        farElbow: [178, 126], farWrist: [179, 146], farKnee: [117, 146], farAnkle: [81, 146], farToe: [71, 146],
      },
    },
    steps: [
      "On hands and knees, breathe in and let your belly drop while you lift your chest and head gently (cow).",
      "Breathe out, press the floor away and round your spine, tucking your chin and tailbone (cat).",
      "Move within a comfortable range. Mobility, not depth, is the aim.",
    ],
    mistakes: "forcing the end range, moving fast. Stay within pain-free range.",
  },
  {
    id: "dead-bug",
    phase: 1,
    name: "Dead bug",
    dose: "3 sets of 8 reps per side, slow and controlled",
    muscles: "Transverse abdominis, rectus abdominis",
    glow: ["torso"],
    cycle: 5,
    poses: {
      start: {
        head: [48, 132], shoulder: [70, 132], elbow: [70, 112], wrist: [70, 92], hip: [120, 132], knee: [120, 96], ankle: [156, 96], toe: [164, 96],
        farElbow: [74, 112], farWrist: [74, 92], farKnee: [124, 96], farAnkle: [160, 96], farToe: [168, 96],
      },
      end: {
        head: [48, 132], shoulder: [70, 132], elbow: [46, 124], wrist: [22, 128], hip: [120, 132], knee: [120, 96], ankle: [156, 96], toe: [164, 96],
        farElbow: [74, 112], farWrist: [74, 92], farKnee: [160, 128], farAnkle: [198, 134], farToe: [206, 136],
      },
    },
    steps: [
      "Lie on your back, arms straight up, hips and knees at 90 degrees.",
      "Press your lower back lightly toward the floor and keep it there.",
      "Slowly lower one arm overhead and the opposite leg toward the floor.",
      "Return and switch sides. If your back arches, reduce the range.",
    ],
    mistakes: "letting the lower back lift off the floor, rushing, holding your breath.",
  },
  {
    id: "goblet-squat",
    phase: 2,
    name: "Goblet squat",
    dose: "3 sets of 8 reps, 3 seconds down. Start with a light load, then use the 20kg bell",
    muscles: "Quadriceps, glutes, core",
    equipment: "kettlebell",
    glow: ["hips", "torso"],
    cycle: 5,
    poses: {
      start: {
        head: [146, 18], shoulder: [146, 34], elbow: [156, 58], wrist: [166, 48], hip: [146, 78], knee: [150, 114], ankle: [148, 150], toe: [166, 150],
      },
      end: {
        head: [172, 72], shoulder: [166, 89], elbow: [172, 108], wrist: [180, 92], hip: [142, 125], knee: [180, 132], ankle: [148, 150], toe: [166, 150],
      },
    },
    steps: [
      "Hold the bell by the horns against your chest, elbows pointing down.",
      "Feet shoulder-width, toes slightly out. Brace your core.",
      "Sit down between your knees, keeping your chest tall and your heels down.",
      "Stop where your back stays neutral, then drive up through the whole foot.",
    ],
    mistakes: "rounding the lower back at the bottom, heels lifting, knees caving in.",
  },
  {
    id: "kettlebell-swing",
    phase: 3,
    name: "Kettlebell swing",
    dose: "Start with 5 sets of 8 reps, 60–90 seconds rest. Build to 10 sets of 10",
    muscles: "Glutes, hamstrings, spinal erectors, core",
    equipment: "kettlebell",
    glow: ["hips", "torso"],
    cycle: 2.2,
    poses: {
      start: {
        head: [168, 72], shoulder: [152, 78], elbow: [135, 90], wrist: [118, 102], hip: [110, 94], knee: [138, 114], ankle: [132, 148], toe: [150, 150],
      },
      end: {
        head: [134, 14], shoulder: [134, 30], elbow: [157, 32], wrist: [180, 34], hip: [134, 74], knee: [134, 112], ankle: [132, 148], toe: [150, 150],
      },
    },
    steps: [
      "Stand with feet slightly wider than your shoulders and the bell one stride in front of you.",
      "Hinge at the hips and hike the bell back between your thighs, with a flat back.",
      "Snap your hips forward, squeeze your glutes and let the bell float to chest height. Your arms only guide it.",
      "Let it fall, hinge again, and keep the lower back neutral throughout.",
    ],
    mistakes: "squatting the swing, lifting with the arms, leaning back at the top. Do not start until Phase 2 is pain-free.",
  },
];
