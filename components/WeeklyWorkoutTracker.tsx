"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Flame, 
  Target, 
  Calendar,
  Zap,
  Star,
  Award,
  TrendingUp,
  Sparkles,
  Clock
} from "lucide-react"

interface WorkoutData {
  date: string
  exercises: any[]
  totalExercises: number
  totalSets: number
  duration?: number
  fitnessLevel: string
  vacationMode: boolean
  completed: boolean
}

interface WeeklyWorkoutTrackerProps {
  workoutHistory: WorkoutData[]
  currentStreak: number
}

const WeeklyWorkoutTracker = ({ workoutHistory, currentStreak }: WeeklyWorkoutTrackerProps) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  
  // Get current week's data
  const weekData = useMemo(() => {
    const today = new Date()
    const currentDay = today.getDay()
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - currentDay)
    weekStart.setHours(0, 0, 0, 0)
    
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)
    
    // Create array for each day of week
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const weeklyData = days.map((day, index) => {
      const dayDate = new Date(weekStart)
      dayDate.setDate(weekStart.getDate() + index)
      const dateStr = dayDate.toISOString().split('T')[0]
      
      const workout = workoutHistory.find(w => w.date === dateStr)
      
      return {
        day,
        date: dayDate,
        dateStr,
        isToday: index === currentDay,
        isFuture: index > currentDay,
        workout,
        completed: !!workout,
        index
      }
    })
    
    return weeklyData
  }, [workoutHistory])
  
  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const completedDays = weekData.filter(d => d.completed).length
    const totalMinutes = weekData.reduce((sum, d) => sum + (d.workout?.duration || 0), 0)
    const totalExercises = weekData.reduce((sum, d) => sum + (d.workout?.totalExercises || 0), 0)
    
    // Calculate XP based on workouts
    let totalXP = 0
    let streakBonus = 1
    
    weekData.forEach(day => {
      if (day.workout) {
        const baseXP = day.workout.fitnessLevel === 'advanced' ? 150 : 
                      day.workout.fitnessLevel === 'intermediate' ? 100 : 75
        totalXP += baseXP * streakBonus
        
        // Increase streak bonus for consecutive days
        if (day.index > 0 && weekData[day.index - 1].completed) {
          streakBonus = Math.min(streakBonus + 0.2, 2)
        }
      } else {
        streakBonus = 1 // Reset streak bonus
      }
    })
    
    const weeklyGoal = 5 // Target 5 workouts per week
    const progress = (completedDays / weeklyGoal) * 100
    const isPerfectWeek = completedDays === 7
    const goalReached = completedDays >= weeklyGoal
    
    return {
      completedDays,
      totalMinutes,
      totalExercises,
      totalXP: Math.round(totalXP),
      progress: Math.min(progress, 100),
      isPerfectWeek,
      goalReached,
      weeklyGoal
    }
  }, [weekData])
  
  // Achievement badges
  const achievements = useMemo(() => {
    const badges = []
    
    if (weeklyStats.isPerfectWeek) {
      badges.push({ icon: Trophy, label: "Perfect Week!", color: "text-yellow-500", bg: "bg-yellow-50" })
    }
    if (currentStreak >= 7) {
      badges.push({ icon: Flame, label: `${currentStreak} Day Streak!`, color: "text-orange-500", bg: "bg-orange-50" })
    }
    if (weeklyStats.totalMinutes >= 150) {
      badges.push({ icon: Clock, label: "150+ Minutes", color: "text-blue-500", bg: "bg-blue-50" })
    }
    if (weeklyStats.goalReached) {
      badges.push({ icon: Target, label: "Goal Achieved!", color: "text-green-500", bg: "bg-green-50" })
    }
    
    return badges
  }, [weeklyStats, currentStreak])
  
  // Motivational message
  const motivationalMessage = useMemo(() => {
    const messages = {
      0: ["Let's start strong! 💪", "Your journey begins today!", "Time to get moving!"],
      1: ["Great start! Keep it up!", "You're on your way!", "One down, let's go!"],
      2: ["Building momentum!", "Consistency is key!", "You're doing great!"],
      3: ["Halfway there!", "You're crushing it!", "Keep the energy up!"],
      4: ["Almost at your goal!", "Fantastic progress!", "One more for the goal!"],
      5: ["Goal achieved! 🎯", "You did it!", "Champion performance!"],
      6: ["Going beyond! 🚀", "Overachiever alert!", "Unstoppable!"],
      7: ["PERFECT WEEK! 🏆", "Legendary status!", "Absolute champion!"]
    }
    
    const messageSet = messages[weeklyStats.completedDays] || messages[7]
    return messageSet[Math.floor(Math.random() * messageSet.length)]
  }, [weeklyStats.completedDays])
  
  // Check for celebration
  useEffect(() => {
    if (weeklyStats.goalReached && !showCelebration) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [weeklyStats.goalReached])
  
  return (
    <Card className="shadow-xl overflow-hidden">
      <CardContent className="p-6">
        {/* Header with XP and Level */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">This Week's Journey</h3>
            <p className="text-sm text-gray-600">{motivationalMessage}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                {weeklyStats.totalXP} XP
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Flame className="w-3 h-3" />
              <span>{currentStreak} day streak</span>
            </div>
          </div>
        </div>
        
        {/* Weekly Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Weekly Goal Progress</span>
            <span className="text-sm font-semibold text-indigo-600">
              {weeklyStats.completedDays}/{weeklyStats.weeklyGoal} workouts
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={weeklyStats.progress} 
              className="h-3 bg-gray-100"
            />
            {weeklyStats.goalReached && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2"
              >
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Day Badges Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekData.map((day, index) => {
            const isSelected = selectedDay === index
            const isCompleted = day.completed
            const isToday = day.isToday
            const isFuture = day.isFuture
            
            return (
              <motion.div
                key={day.day}
                whileHover={!isFuture ? { scale: 1.05 } : {}}
                whileTap={!isFuture ? { scale: 0.95 } : {}}
                onClick={() => !isFuture && setSelectedDay(isSelected ? null : index)}
                className="relative"
              >
                <div
                  className={`
                    relative p-3 rounded-xl cursor-pointer transition-all duration-200
                    ${isCompleted 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg' 
                      : isFuture 
                        ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                    ${isToday && !isCompleted ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                    ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}
                  `}
                >
                  <div className="text-center">
                    <p className="text-xs font-medium mb-1">{day.day}</p>
                    <p className="text-lg font-bold">
                      {day.date.getDate()}
                    </p>
                  </div>
                  
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      </div>
                    </motion.div>
                  )}
                  
                  {isToday && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </motion.div>
                  )}
                </div>
                
                {/* Workout details on hover/select */}
                <AnimatePresence>
                  {isSelected && day.workout && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-10 w-48"
                    >
                      <div className="bg-white rounded-lg shadow-xl border p-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          {day.workout.totalExercises} exercises
                        </p>
                        <p className="text-xs text-gray-500">
                          {day.workout.totalSets} circuits
                          {day.workout.duration && ` • ${day.workout.duration} min`}
                        </p>
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {day.workout.fitnessLevel}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
        
        {/* Achievement Badges */}
        {achievements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-xs font-semibold text-gray-600 mb-2">This Week's Achievements</p>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${achievement.bg}`}>
                    <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                    <span className={`text-xs font-medium ${achievement.color}`}>
                      {achievement.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Stats Summary */}
        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{weeklyStats.completedDays}</p>
            <p className="text-xs text-gray-500">Workouts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{weeklyStats.totalExercises}</p>
            <p className="text-xs text-gray-500">Exercises</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{weeklyStats.totalMinutes}</p>
            <p className="text-xs text-gray-500">Minutes</p>
          </div>
        </div>
        
        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default WeeklyWorkoutTracker