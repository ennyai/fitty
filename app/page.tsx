"use client"

import { useState, useEffect } from "react"
import { Home, Plane, Trophy, ChevronRight, ChevronLeft, RotateCcw, Check, X, Info, Play } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const BodyweightTrainingApp = () => {
  // Exercise database with GIFs and enhanced data
  const exercises = {
    // Push exercises
    pushUps: {
      name: "Push-ups",
      requiresEquipment: false,
      category: "push",
      muscleGroups: ["chest", "triceps", "shoulders"],
      targets: "Chest, triceps, front shoulders, core",
      instructions:
        "Start in plank position with hands shoulder-width apart. Lower chest to floor by bending elbows. Push back up to starting position.",
    },
    diamondPushUps: {
      name: "Diamond Push-ups",
      requiresEquipment: false,
      category: "push",
      muscleGroups: ["triceps", "chest"],
      targets: "Triceps, inner chest",
      instructions: "Form a diamond with hands under chest. Lower body keeping elbows close. Push back up.",
    },
    widePushUps: {
      name: "Wide Push-ups",
      requiresEquipment: false,
      category: "push",
      muscleGroups: ["chest", "shoulders"],
      targets: "Outer chest, shoulders",
      instructions: "Place hands wider than shoulders. Lower chest between hands. Push back up.",
    },
    pikePushUps: {
      name: "Pike Push-ups",
      requiresEquipment: false,
      category: "push",
      muscleGroups: ["shoulders"],
      targets: "Shoulders, upper chest",
      instructions: "Start in downward dog position. Lower head toward floor between hands. Push back up.",
    },
    tricepDips: {
      name: "Tricep Dips",
      requiresEquipment: true,
      category: "push",
      muscleGroups: ["triceps"],
      targets: "Triceps, lower chest",
      instructions: "Grip edge of bench/chair behind you. Lower body by bending elbows to 90°. Push back up.",
    },

    // Pull exercises
    pullUps: {
      name: "Pull-ups",
      requiresEquipment: true,
      category: "pull",
      muscleGroups: ["back", "biceps"],
      targets: "Lats, middle back, biceps",
      instructions:
        "Hang from bar with overhand grip, arms fully extended. Pull your body up until chin is over the bar. Lower with control.",
    },
    supermanHolds: {
      name: "Superman Holds",
      requiresEquipment: false,
      category: "pull",
      muscleGroups: ["back"],
      isHold: true,
      targets: "Lower back, glutes",
      instructions: "Lie face down. Lift chest, arms, and legs off ground simultaneously. Hold position.",
    },
    doorwayRows: {
      name: "Doorway Rows",
      requiresEquipment: false,
      category: "pull",
      muscleGroups: ["back", "biceps"],
      targets: "Middle back, biceps",
      instructions: "Stand in doorway, grip frame. Lean back with straight body. Pull chest to doorway.",
    },

    // Core exercises
    plank: {
      name: "Plank",
      requiresEquipment: false,
      category: "core",
      muscleGroups: ["core"],
      isHold: true,
      targets: "Entire core, shoulders",
      instructions: "Forearms on ground, body straight from head to heels. Hold position, breathing normally.",
    },
    sidePlank: {
      name: "Side Plank",
      requiresEquipment: false,
      category: "core",
      muscleGroups: ["obliques"],
      isHold: true,
      targets: "Obliques, lateral core",
      instructions: "Lie on side, prop up on forearm. Lift hips to form straight line. Hold position.",
    },
    bicycleCrunches: {
      name: "Bicycle Crunches",
      requiresEquipment: false,
      category: "core",
      muscleGroups: ["abs", "obliques"],
      targets: "Abs, obliques",
      instructions:
        "Lie on back, hands behind head. Bring elbow to opposite knee while extending other leg. Alternate.",
    },
    legRaises: {
      name: "Leg Raises",
      requiresEquipment: false,
      category: "core",
      muscleGroups: ["lower abs"],
      targets: "Lower abs, hip flexors",
      instructions: "Lie on back, hands at sides. Keep legs straight and lift to 90°. Lower without touching floor.",
    },
    mountainClimbers: {
      name: "Mountain Climbers",
      requiresEquipment: false,
      category: "cardio",
      muscleGroups: ["core", "cardio"],
      targets: "Core, shoulders, cardio",
      instructions: "Start in plank. Drive one knee toward chest, then quickly switch legs. Keep hips level.",
    },

    // Leg exercises
    squats: {
      name: "Squats",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["quads", "glutes"],
      targets: "Quads, glutes, hamstrings",
      instructions: "Feet shoulder-width apart. Lower hips back and down like sitting. Drive through heels to stand.",
    },
    jumpSquats: {
      name: "Jump Squats",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["quads", "glutes", "calves"],
      targets: "Quads, glutes, calves, power",
      instructions: "Perform squat, then explode up into jump. Land softly and immediately squat again.",
    },
    lunges: {
      name: "Lunges",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["quads", "glutes"],
      targets: "Quads, glutes, balance",
      instructions: "Step forward, lower hips until both knees at 90°. Push through front heel to return.",
    },
    wallSit: {
      name: "Wall Sit",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["quads"],
      isHold: true,
      targets: "Quads, glutes",
      instructions: "Back against wall, slide down until thighs parallel to floor. Hold position.",
    },
    calfRaises: {
      name: "Calf Raises",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["calves"],
      targets: "Calves",
      instructions: "Stand tall, rise up onto toes as high as possible. Lower with control. Repeat.",
    },
    gluteBridges: {
      name: "Glute Bridges",
      requiresEquipment: false,
      category: "legs",
      muscleGroups: ["glutes", "hamstrings"],
      targets: "Glutes, hamstrings",
      instructions: "Lie on back, knees bent. Squeeze glutes and lift hips up. Lower slowly.",
    },

    // Full body/Cardio exercises
    burpees: {
      name: "Burpees",
      requiresEquipment: false,
      category: "full",
      muscleGroups: ["full body"],
      targets: "Full body, cardio",
      instructions: "Stand, drop to plank, do a push-up, jump feet to hands, jump up with arms overhead.",
    },
    jumpingJacks: {
      name: "Jumping Jacks",
      requiresEquipment: false,
      category: "cardio",
      muscleGroups: ["full body"],
      targets: "Full body, cardio",
      instructions: "Jump feet apart while raising arms overhead. Jump back to start position.",
    },
    highKnees: {
      name: "High Knees",
      requiresEquipment: false,
      category: "cardio",
      muscleGroups: ["legs", "cardio"],
      targets: "Hip flexors, cardio",
      instructions: "Run in place, driving knees up to waist level. Pump arms for momentum.",
    },
  }

  // State management
  const [currentView, setCurrentView] = useState("home")
  const [vacationMode, setVacationMode] = useState(false)
  const [workoutActive, setWorkoutActive] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [restTime, setRestTime] = useState(60)
  const [holdTime, setHoldTime] = useState(0)
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [userLevel, setUserLevel] = useState("intermediate")
  const [todaysWorkout, setTodaysWorkout] = useState([])
  const [personalRecords, setPersonalRecords] = useState({})
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showExerciseDetail, setShowExerciseDetail] = useState(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("workoutHistory")
    const savedPRs = localStorage.getItem("personalRecords")
    const savedLevel = localStorage.getItem("userLevel")
    const savedVacationMode = localStorage.getItem("vacationMode")

    if (savedHistory) setWorkoutHistory(JSON.parse(savedHistory))
    if (savedPRs) setPersonalRecords(JSON.parse(savedPRs))
    if (savedLevel) setUserLevel(savedLevel)
    if (savedVacationMode) setVacationMode(JSON.parse(savedVacationMode))
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("workoutHistory", JSON.stringify(workoutHistory))
  }, [workoutHistory])

  useEffect(() => {
    localStorage.setItem("personalRecords", JSON.stringify(personalRecords))
  }, [personalRecords])

  useEffect(() => {
    localStorage.setItem("userLevel", userLevel)
  }, [userLevel])

  useEffect(() => {
    localStorage.setItem("vacationMode", JSON.stringify(vacationMode))
  }, [vacationMode])

  // Generate daily workout based on level and vacation mode
  const generateWorkout = () => {
    const availableExercises = Object.entries(exercises).filter(
      ([key, exercise]) => !vacationMode || !exercise.requiresEquipment,
    )

    const workoutTemplate = {
      beginner: { exercises: 4, sets: 2, reps: "8-12", holdTime: 20 },
      intermediate: { exercises: 5, sets: 3, reps: "10-15", holdTime: 30 },
      advanced: { exercises: 6, sets: 4, reps: "15-20", holdTime: 45 },
    }

    const template = workoutTemplate[userLevel]
    const workout = []
    const usedCategories = new Set()

    const totalCircuits = template.sets

    // Ensure variety by selecting from different categories
    for (let i = 0; i < template.exercises; i++) {
      const availableForSelection = availableExercises.filter(
        ([key, ex]) => !usedCategories.has(ex.category) || usedCategories.size >= 4,
      )

      if (availableForSelection.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableForSelection.length)
        const [exerciseKey, exercise] = availableForSelection[randomIndex]

        workout.push({
          key: exerciseKey,
          ...exercise,
          sets: totalCircuits,
          reps: exercise.isHold ? template.holdTime : template.reps,
          instructions: exercise.instructions,
          targets: exercise.targets,
        })

        usedCategories.add(exercise.category)
      }
    }

    setTodaysWorkout(workout)
  }

  // Timer for rest periods and holds
  useEffect(() => {
    let interval
    if (isResting && restTime > 0 && workoutActive) {
      interval = setInterval(() => {
        setRestTime((prev) => prev - 1)
      }, 1000)
    } else if (isResting && restTime === 0) {
      setIsResting(false)
      setRestTime(60)
    }

    if (workoutActive && todaysWorkout[currentExerciseIndex]?.isHold && holdTime > 0) {
      interval = setInterval(() => {
        setHoldTime((prev) => prev - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isResting, restTime, workoutActive, holdTime, currentExerciseIndex, todaysWorkout])

  // Start workout
  const startWorkout = () => {
    if (todaysWorkout.length === 0) {
      generateWorkout()
    }
    setWorkoutActive(true)
    setCurrentView("workout")
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
  }

  // Complete current set
  const completeSet = () => {
    const totalCircuits = todaysWorkout[0]?.sets || 3
    const isLastExercise = currentExerciseIndex === todaysWorkout.length - 1
    const isLastCircuit = currentSet >= totalCircuits

    if (isLastExercise && isLastCircuit) {
      completeWorkout()
    } else if (isLastExercise) {
      setCurrentSet((prev) => prev + 1)
      setCurrentExerciseIndex(0)
      setIsResting(true)
    } else {
      setCurrentExerciseIndex((prev) => prev + 1)
      setIsResting(true)
    }
  }

  // Add this function after the completeSet function
  const goBackToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      // Go back to previous exercise in current circuit
      setCurrentExerciseIndex((prev) => prev - 1)
      setIsResting(false)
      setRestTime(60)
    } else if (currentSet > 1) {
      // Go back to last exercise of previous circuit
      setCurrentSet((prev) => prev - 1)
      setCurrentExerciseIndex(todaysWorkout.length - 1)
      setIsResting(false)
      setRestTime(60)
    }
  }

  // Complete workout
  const completeWorkout = () => {
    const today = new Date().toISOString().split("T")[0]
    const workoutData = {
      date: today,
      exercises: todaysWorkout.map((ex) => ex.name),
      vacationMode,
      completed: true,
    }

    setWorkoutHistory((prev) => [...prev, workoutData])
    setWorkoutActive(false)
    setCurrentView("complete")
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setHoldTime(0)
    setIsResting(false)
    setRestTime(60)
  }

  // End workout early
  const endWorkoutEarly = () => {
    setWorkoutActive(false)
    setCurrentView("home")
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setHoldTime(0)
    setIsResting(false)
    setRestTime(60)
    setTodaysWorkout([])
    setShowEndConfirm(false)
  }

  // Calculate streak
  const calculateStreak = () => {
    if (workoutHistory.length === 0) return 0

    const sortedHistory = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date))

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < sortedHistory.length; i++) {
      const workoutDate = new Date(sortedHistory[i].date)
      workoutDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24))

      if (daysDiff === i || daysDiff === i + 1) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  // Exercise Detail Modal
  const ExerciseDetailModal = ({ exercise, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Target Muscles</p>
              <p className="text-sm text-gray-800">{exercise.targets}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Instructions</p>
              <p className="text-sm text-gray-800 leading-relaxed">{exercise.instructions}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {exercise.muscleGroups.map((muscle, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>

            {exercise.requiresEquipment && (
              <div className="p-2 bg-orange-50 rounded-lg">
                <p className="text-xs text-orange-700">⚠️ Requires equipment</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Render different views
  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                💪 BodyForge 
              </h1>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("stats")}>
                <Trophy className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Home</span>
                </div>
                <button
                  onClick={() => setVacationMode(!vacationMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    vacationMode ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                      vacationMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Vacation</span>
                  <Plane className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              {vacationMode && (
                <p className="text-sm text-orange-600 mt-3 text-center">Equipment-free exercises only</p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Current Streak</span>
                <span className="text-2xl font-bold text-indigo-600">{calculateStreak()} days</span>
              </div>
              <Progress value={Math.min(calculateStreak() * 10, 100)} className="h-2" />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">Fitness Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["beginner", "intermediate", "advanced"].map((level) => (
                  <Button
                    key={level}
                    variant={userLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUserLevel(level)}
                    className="capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => {
                generateWorkout()
                setCurrentView("preview")
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 text-lg font-semibold"
              size="lg"
            >
              Today's Workout
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Workouts</h3>
            {workoutHistory
              .slice(-3)
              .reverse()
              .map((workout, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-gray-600">{new Date(workout.date).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    {workout.vacationMode && <Plane className="w-4 h-4 text-orange-500" />}
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            {workoutHistory.length === 0 && (
              <p className="text-gray-400 text-center py-4">No workouts yet. Let's start!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Workout</h2>

            <div className="space-y-3 mb-6">
              {todaysWorkout.map((exercise, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{exercise.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowExerciseDetail(exercise)}
                          className="p-1 h-6 w-6"
                        >
                          <Info className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {exercise.isHold ? `${exercise.reps}s hold` : `${exercise.reps} reps`}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroups.slice(0, 2).map((muscle, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Targets:</span> {exercise.targets}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg mb-6">
              <p className="text-sm text-blue-800 font-medium mb-1">Workout Structure:</p>
              <p className="text-sm text-blue-700">
                {todaysWorkout[0]?.sets || 3} circuits × {todaysWorkout.length} exercises
              </p>
              <p className="text-xs text-blue-600 mt-1">Complete all exercises in order, then repeat the circuit</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentView("home")} className="flex-1">
                Back
              </Button>
              <Button
                onClick={startWorkout}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Start Workout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderWorkout = () => {
    const currentExercise = todaysWorkout[currentExerciseIndex]
    if (!currentExercise) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Circuit {currentSet} of {currentExercise.sets} - Exercise {currentExerciseIndex + 1} of{" "}
                    {todaysWorkout.length}
                  </span>
                  <div className="flex gap-2">
                    {(currentExerciseIndex > 0 || currentSet > 1) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={goBackToPreviousExercise}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEndConfirm(true)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <Progress
                  value={
                    (((currentSet - 1) * todaysWorkout.length + currentExerciseIndex + 1) /
                      (todaysWorkout.length * currentExercise.sets)) *
                    100
                  }
                  className="h-2"
                />
              </div>

              {showEndConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <Card className="max-w-sm w-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">End Workout Early?</h3>
                      <p className="text-gray-600 mb-6">Your progress will not be saved.</p>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowEndConfirm(false)} className="flex-1">
                          Continue Workout
                        </Button>
                        <Button variant="destructive" onClick={endWorkoutEarly} className="flex-1">
                          End Workout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {isResting ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Rest Time</h3>
                  <div className="text-6xl font-bold text-indigo-600 mb-6">{restTime}s</div>
                  <Button variant="outline" onClick={() => setRestTime(0)}>
                    Skip Rest
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentExercise.name}</h3>
                    <p className="text-gray-600">
                      Circuit {currentSet} of {currentExercise.sets}
                    </p>
                  </div>

                  {/* Exercise Instructions */}
                  <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-indigo-800 text-center leading-relaxed">
                      {currentExercise.instructions}
                    </p>
                  </div>

                  {/* Target Muscles */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Targets:</span> {currentExercise.targets}
                    </p>
                  </div>

                  {currentExercise.isHold ? (
                    <div className="text-center py-8">
                      <div className="text-6xl font-bold text-indigo-600 mb-4">
                        {holdTime > 0 ? holdTime : currentExercise.reps}s
                      </div>
                      {holdTime === 0 ? (
                        <Button
                          onClick={() => setHoldTime(currentExercise.reps)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-8 text-lg font-semibold"
                          size="lg"
                        >
                          <Play className="mr-2 w-5 h-5" />
                          Start Hold
                        </Button>
                      ) : (
                        <div>
                          <p className="text-gray-600 mb-4">Hold the position!</p>
                          <Button
                            onClick={() => {
                              setHoldTime(0)
                              completeSet()
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-4 px-8 text-lg font-semibold"
                            size="lg"
                          >
                            <Check className="mr-2 w-5 h-5" />
                            Complete Hold
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-8">
                        <p className="text-2xl font-semibold text-gray-800 mb-2">Complete your set</p>
                        <p className="text-lg text-gray-600">Target: {currentExercise.reps} reps</p>
                      </div>

                      <Button
                        onClick={completeSet}
                        className="w-48 h-48 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full text-xl font-bold mb-6"
                      >
                        <div className="flex flex-col items-center">
                          <Check className="w-16 h-16 mb-2" />
                          <span>Complete Set</span>
                        </div>
                      </Button>

                      <p className="text-sm text-gray-500">Tap when you've finished your reps</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderComplete = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Workout Complete!</h2>
            <p className="text-gray-600 mb-6">Great job! You're building strength every day.</p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-indigo-600">{calculateStreak()} days</p>
            </div>

            <Button
              onClick={() => {
                setCurrentView("home")
                setTodaysWorkout([])
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 font-semibold"
              size="lg"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderStats = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Stats</h2>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("home")}>
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
                <p className="text-sm text-indigo-600 mb-1">Total Workouts</p>
                <p className="text-2xl font-bold text-indigo-800">{workoutHistory.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <p className="text-sm text-purple-600 mb-1">Current Streak</p>
                <p className="text-2xl font-bold text-purple-800">{calculateStreak()} days</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-3">Personal Records</h3>
            <div className="space-y-2 mb-6">
              {Object.entries(personalRecords).map(([exerciseKey, record]) => (
                <div key={exerciseKey} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{exercises[exerciseKey]?.name || exerciseKey}</span>
                  <span className="font-bold text-indigo-600">{record} reps</span>
                </div>
              ))}
              {Object.keys(personalRecords).length === 0 && (
                <p className="text-gray-400 text-center py-4">Complete workouts to set records!</p>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowResetConfirm(true)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Reset All Data
            </Button>

            {showResetConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="max-w-sm w-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Reset All Data?</h3>
                    <p className="text-gray-600 mb-6">
                      This will delete all your workout history and personal records. This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowResetConfirm(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          localStorage.clear()
                          setWorkoutHistory([])
                          setPersonalRecords({})
                          setUserLevel("intermediate")
                          setVacationMode(false)
                          setShowResetConfirm(false)
                        }}
                        className="flex-1"
                      >
                        Reset Everything
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Main render
  return (
    <div className="font-sans">
      {currentView === "home" && renderHome()}
      {currentView === "preview" && renderPreview()}
      {currentView === "workout" && renderWorkout()}
      {currentView === "complete" && renderComplete()}
      {currentView === "stats" && renderStats()}

      {showExerciseDetail && (
        <ExerciseDetailModal exercise={showExerciseDetail} onClose={() => setShowExerciseDetail(null)} />
      )}
    </div>
  )
}

export default BodyweightTrainingApp
