"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Sparkles, Star, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function RomanticLetter() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showHearts, setShowHearts] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showWelcome, setShowWelcome] = useState(true)

  const loveMessages = [
    "Every moment without you feels like an eternity, but every memory with you lasts forever ✨",
    "If I were there right now, I'd hug you from behind while you read this 💕",
    "You're the reason I believe in magic, because loving you feels impossible yet so real 🌙",
    "Distance means nothing when someone means everything 💫",
    "I carry your heart with me, I carry it in my heart ❤️",
  ]

  const hiddenMessages = [
    "Try searching for 'hug', 'kiss', or 'love' on this page (Ctrl+F) to find hidden surprises 💕",
    "Look closely at the stars - each one represents a reason I love you ⭐",
    "The moon above knows all my secrets about you 🌙",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 2000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Hide welcome message after 4 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Set up intersection observer to play music when "Your Own Beautiful Words" section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === "beautiful-words-section" && !musicStarted) {
            if (audioRef.current) {
              audioRef.current.volume = volume
              audioRef.current.play().catch(console.error)
              setMusicPlaying(true)
              setMusicStarted(true)
            }
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    )

    const section = document.getElementById("beautiful-words-section")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [isUnlocked, musicStarted, volume])

  const unlockLetter = () => {
    setIsUnlocked(true)
  }

  const nextMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % loveMessages.length)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.play().catch(console.error)
        setMusicPlaying(true)
        setMusicStarted(true)
      }
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const sliderStyle = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(45deg, #a855f7, #ec4899);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(45deg, #a855f7, #ec4899);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(5deg); }
    66% { transform: translateY(5px) rotate(-3deg); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.4); }
    50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(236, 72, 153, 0.6); }
  }

  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }

  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes welcomeFade {
    0% { opacity: 1; transform: scale(1); }
    90% { opacity: 1; transform: scale(1.05); }
    100% { opacity: 0; transform: scale(0.95); }
  }

  .float-animation { animation: float 6s ease-in-out infinite; }
  .sparkle-animation { animation: sparkle 2s ease-in-out infinite; }
  .heartbeat-animation { animation: heartbeat 2s ease-in-out infinite; }
  .fade-in-up { animation: fadeInUp 1s ease-out; }
  .slide-in-left { animation: slideInLeft 1s ease-out; }
  .slide-in-right { animation: slideInRight 1s ease-out; }
  .glow-animation { animation: glow 3s ease-in-out infinite; }
  .rainbow-animation { animation: rainbow 8s linear infinite; }
  .bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
  .welcome-fade { animation: welcomeFade 4s ease-in-out forwards; }
`

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Audio element for background music */}
      <audio ref={audioRef} loop onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)}>
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BHUMIII-CgjxwUKqZ0tAhbV8egeIxi6eEVf3ld.mp3" type="audio/mpeg" />
      </audio>
      <style dangerouslySetInnerHTML={{ __html: sliderStyle }} />

      {/* Welcome Message for First Visit */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center welcome-fade">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl border-2 border-pink-200 max-w-md mx-4">
            <div className="text-6xl mb-4 heartbeat-animation">💕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 rainbow-animation">Welcome, My Beautiful Bhumii</h2>
            <p className="text-gray-600 italic mb-4">This is a special letter made just for you...</p>
            <p className="text-sm text-purple-600 sparkle-animation">✨ Get ready for something magical ✨</p>
          </div>
        </div>
      )}

      {!isUnlocked ? (
        // Lock Screen with Background Image
        <div
          className="min-h-screen relative"
          style={{
            backgroundImage: `url('/images/couple-background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Animated Floating Elements */}
          <div className="fixed inset-0 pointer-events-none z-5">
            {/* Floating Hearts */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`heart-${i}`}
                className="absolute text-pink-400 opacity-30 float-animation"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  fontSize: `${Math.random() * 15 + 10}px`,
                }}
              >
                💕
              </div>
            ))}

            {/* Floating Sparkles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute text-yellow-300 opacity-40 sparkle-animation"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  fontSize: `${Math.random() * 8 + 6}px`,
                }}
              >
                ✨
              </div>
            ))}

            {/* Floating Love Symbols */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`symbol-${i}`}
                className="absolute text-purple-300 opacity-25 bounce-gentle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 12 + 8}px`,
                }}
              >
                {["💖", "🌟", "💫", "🦋", "🌸"][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>

          {/* Floating Hearts Animation */}
          {showHearts && (
            <div className="fixed inset-0 pointer-events-none z-10">
              {[...Array(20)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-pink-400 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Background Stars */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-300 opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 8 + 4}px`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-8 relative z-20">
            <div className="flex items-center justify-center min-h-screen">
              <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200 fade-in-up glow-animation">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 heartbeat-animation" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2 slide-in-left">A Letter From Your Heart</h1>
                    <p className="text-gray-600 italic slide-in-right">"Unlock when you miss me" 💕</p>
                  </div>

                  <div className="mb-6 float-animation">
                    <Image
                      src="/images/boyfriend-photo.jpg"
                      alt="Missing you"
                      width={200}
                      height={200}
                      className="rounded-full mx-auto shadow-lg border-4 border-pink-200 object-cover glow-animation"
                    />
                  </div>

                  <Button
                    onClick={unlockLetter}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 rainbow-animation"
                  >
                    <Heart className="w-5 h-5 mr-2 heartbeat-animation" />
                    Unlock My Heart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Main Letter Content
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Floating Love Elements */}
            {[...Array(25)].map((_, i) => (
              <div
                key={`bg-element-${i}`}
                className="absolute opacity-20 float-animation"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  fontSize: `${Math.random() * 20 + 15}px`,
                }}
              >
                {["💕", "✨", "🌟", "💖", "🦋", "🌸", "💫", "🌙"][Math.floor(Math.random() * 8)]}
              </div>
            ))}

            {/* Animated Gradient Orbs */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute rounded-full opacity-10 float-animation"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  background: `linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))`,
                  animationDelay: `${Math.random() * 6}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Hearts Animation */}
          {showHearts && (
            <div className="fixed inset-0 pointer-events-none z-10">
              {[...Array(20)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-pink-400 animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    fontSize: `${Math.random() * 20 + 10}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Background Stars */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-300 opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 8 + 4}px`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-8 relative z-20">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12 fade-in-up">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 rainbow-animation">
                  My Dearest Love
                </h1>
                <div className="flex items-center justify-center gap-2 text-gray-600 bounce-gentle">
                  <Moon className="w-5 h-5 sparkle-animation" />
                  <span>Written under the stars, sent with all my love</span>
                  <Sun className="w-5 h-5 sparkle-animation" />
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 slide-in-left glow-animation">
                  <CardContent className="p-4">
                    <Image
                      src="/images/first-hello.jpg"
                      alt="Our First Hello"
                      width={300}
                      height={250}
                      className="rounded-lg w-full object-cover"
                    />
                    <p className="text-center mt-3 text-gray-700 font-medium heartbeat-animation">Our First Hello</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 fade-in-up glow-animation">
                  <CardContent className="p-4">
                    <Image
                      src="/images/endless-laughter.jpg"
                      alt="Endless Laughter"
                      width={300}
                      height={250}
                      className="rounded-lg w-full object-cover"
                    />
                    <p className="text-center mt-3 text-gray-700 font-medium heartbeat-animation">Endless Laughter</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 slide-in-right glow-animation">
                  <CardContent className="p-4">
                    <Image
                      src="/images/perfect-moments.jpg"
                      alt="Perfect Moments"
                      width={300}
                      height={250}
                      className="rounded-lg w-full object-cover"
                    />
                    <p className="text-center mt-3 text-gray-700 font-medium heartbeat-animation">Perfect Moments</p>
                  </CardContent>
                </Card>
              </div>

              {/* Her Most Precious Gift Section */}
              <Card className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 shadow-xl mb-8 border-2 border-amber-200 slide-in-right glow-animation">
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Golden sparkles background */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`golden-sparkle-${i}`}
                        className="absolute text-yellow-400 opacity-30 sparkle-animation"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          fontSize: `${Math.random() * 12 + 8}px`,
                        }}
                      >
                        ✨
                      </div>
                    ))}

                    {/* Floating hearts */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={`treasure-heart-${i}`}
                        className="absolute text-amber-300 opacity-25 float-animation"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 6}s`,
                          fontSize: `${Math.random() * 16 + 10}px`,
                        }}
                      >
                        💛
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-8 relative z-10 fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-6 shadow-lg float-animation">
                      <span className="text-3xl">💎</span>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-3 rainbow-animation">
                      My Most Precious Treasure
                    </h2>
                    <p className="text-gray-700 italic text-lg bounce-gentle">
                      The most priceless gift from my angel's heart 💛
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-yellow-200 relative glow-animation">
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 text-3xl opacity-40 float-animation">🎁</div>
                    <div className="absolute top-4 right-4 text-3xl opacity-40 float-animation">💝</div>
                    <div className="absolute bottom-4 left-4 text-2xl opacity-40 float-animation">🌟</div>
                    <div className="absolute bottom-4 right-4 text-2xl opacity-40 float-animation">✨</div>

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-amber-700 mb-4 heartbeat-animation">
                        "Still Not Met, But Already Love" 💕
                      </h3>
                      <p className="text-gray-600 italic mb-6 slide-in-left">
                        When my beautiful Bhumii surprised me with the most thoughtful gift in the universe
                      </p>
                    </div>

                    {/* The precious gift image */}
                    <div className="mb-8 text-center">
                      <div className="inline-block p-4 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl shadow-inner border-2 border-amber-200 float-animation">
                        <Image
                          src="/images/precious-gift.jpg"
                          alt="The most precious gift from my angel - our custom music frame"
                          width={400}
                          height={600}
                          className="rounded-xl shadow-2xl mx-auto glow-animation"
                        />
                      </div>
                    </div>

                    {/* Description of why it's precious */}
                    <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 mb-8 border-l-4 border-amber-400 slide-in-right">
                        <div className="text-center mb-6">
                          <div className="text-4xl mb-3 heartbeat-animation">💎</div>
                          <h4 className="text-xl font-bold text-amber-700 mb-4">
                            Why This Is My Most Precious Treasure
                          </h4>
                        </div>

                        <div className="space-y-4 text-center">
                          <p className="text-lg font-medium text-gray-800 sparkle-animation">
                            "This isn't just a gift - it's a piece of your heart that I can hold forever"
                          </p>

                          <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-yellow-50 rounded-xl p-6 text-center border border-yellow-200 glow-animation">
                              <div className="text-3xl mb-3 bounce-gentle">🎨</div>
                              <h5 className="font-semibold text-yellow-700 mb-2">Your Creativity</h5>
                              <p className="text-sm text-gray-700">
                                You turned our love into art, making something so personal and beautiful
                              </p>
                            </div>

                            <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200 glow-animation">
                              <div className="text-3xl mb-3 bounce-gentle">🎵</div>
                              <h5 className="font-semibold text-amber-700 mb-2">Our Song</h5>
                              <p className="text-sm text-gray-700">
                                "Still not met, but already love" - the perfect soundtrack to our story
                              </p>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200 glow-animation">
                              <div className="text-3xl mb-3 bounce-gentle">💝</div>
                              <h5 className="font-semibold text-orange-700 mb-2">Your Thoughtfulness</h5>
                              <p className="text-sm text-gray-700">
                                Every detail shows how much you care and understand my heart
                              </p>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-6 text-center border border-yellow-200 glow-animation">
                              <div className="text-3xl mb-3 bounce-gentle">♾️</div>
                              <h5 className="font-semibold text-yellow-700 mb-2">Forever Keepsake</h5>
                              <p className="text-sm text-gray-700">
                                Something I'll treasure for the rest of my life, a symbol of your love
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Personal message about the gift */}
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 text-center border-2 border-amber-200 shadow-inner fade-in-up">
                        <div className="text-5xl mb-4 heartbeat-animation">💛</div>
                        <h4 className="text-2xl font-bold text-amber-700 mb-4 rainbow-animation">
                          To My Incredibly Thoughtful Angel
                        </h4>
                        <div className="space-y-4">
                          <p className="text-lg text-gray-800 font-medium leading-relaxed">
                            "When you gave me this, my heart stopped. Not because of what it was, but because of what it
                            represented - your pure, innocent love taking physical form."
                          </p>
                          <p className="text-gray-700 italic">
                            This sits in my room as a daily reminder that I have the most amazing, creative, and loving
                            girlfriend in the world.
                          </p>
                          <p className="text-amber-700 font-semibold sparkle-animation">
                            Every time I look at it, I fall in love with you all over again 💕
                          </p>
                        </div>
                      </div>

                      {/* Special quote section */}
                      <div className="mt-8 text-center">
                        <div className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 rounded-full p-8 inline-block shadow-lg glow-animation">
                          <p className="text-xl font-bold text-gray-800 heartbeat-animation">
                            "Some gifts are expensive, but yours is priceless" 💎
                          </p>
                          <p className="text-sm text-gray-600 mt-3 italic sparkle-animation">
                            Because it came from the purest heart I know - yours, my beautiful Bhumii
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden searchable terms for this section */}
                  <div className="hidden-treasure-terms">
                    <span className="opacity-0 absolute -z-10">precious</span>
                    <span className="opacity-0 absolute -z-10">treasure</span>
                    <span className="opacity-0 absolute -z-10">priceless</span>
                    <span className="opacity-0 absolute -z-10">gift</span>
                    <span className="opacity-0 absolute -z-10">thoughtful</span>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Love Messages */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-8 fade-in-up glow-animation">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3 sparkle-animation" />
                    <h2 className="text-2xl font-bold text-gray-800 rainbow-animation">Messages From My Heart</h2>
                  </div>

                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-6 float-animation">
                    <p className="text-lg text-gray-800 text-center italic leading-relaxed">
                      "{loveMessages[currentMessage]}"
                    </p>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={nextMessage}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 bounce-gentle"
                    >
                      <Heart className="w-5 h-5 mr-2 heartbeat-animation" />
                      Next Love Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cute Couplet Heart Section */}
              <Card className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 shadow-xl mb-8 border-2 border-rose-200 slide-in-left glow-animation">
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Floating heart elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={`couplet-heart-${i}`}
                        className="absolute text-pink-300 opacity-30 float-animation"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 6}s`,
                          fontSize: `${Math.random() * 12 + 8}px`,
                        }}
                      >
                        💕
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-8 relative z-10 fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-6 shadow-lg float-animation">
                      <span className="text-3xl">💖</span>
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3 rainbow-animation">
                      Couplets From My Heart
                    </h2>
                    <p className="text-gray-700 italic text-lg bounce-gentle">
                      Little poems that capture my love for you 💕
                    </p>
                  </div>

                  {/* Heart-shaped container for couplets */}
                  <div className="relative max-w-2xl mx-auto">
                    {/* Large heart shape background */}
                    <div className="relative bg-gradient-to-br from-pink-100 to-rose-100 rounded-t-full rounded-b-none mx-auto w-80 h-80 flex items-center justify-center shadow-2xl border-4 border-pink-200 glow-animation">
                      {/* Heart shape using CSS */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-t-full transform rotate-45 origin-bottom-left"
                           style={{
                             width: '200px',
                             height: '200px',
                             top: '40px',
                             left: '40px',
                             borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                           }}>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-t-full transform -rotate-45 origin-bottom-right"
                           style={{
                             width: '200px',
                             height: '200px',
                             top: '40px',
                             right: '40px',
                             borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                           }}>
                      </div>

                      {/* Couplet content inside heart */}
                      <div className="relative z-10 text-center p-8 max-w-xs">
                        <div className="space-y-6">
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg heartbeat-animation">
                            <p className="text-lg font-medium text-rose-700 leading-relaxed">
                              "In your eyes I see my home,<br/>
                              In your heart I'll never roam"
                            </p>
                            <p className="text-sm text-gray-600 mt-2 italic sparkle-animation">💕</p>
                          </div>

                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg heartbeat-animation">
                            <p className="text-lg font-medium text-pink-700 leading-relaxed">
                              "Distance fades when love is true,<br/>
                              Every beat belongs to you"
                            </p>
                            <p className="text-sm text-gray-600 mt-2 italic sparkle-animation">💖</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional cute couplets around the heart */}
                    <div className="grid md:grid-cols-2 gap-6 mt-12">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-rose-200 slide-in-left glow-animation">
                        <div className="text-center">
                          <div className="text-4xl mb-3 bounce-gentle">🌸</div>
                          <h4 className="text-xl font-bold text-rose-700 mb-4 heartbeat-animation">Sweet & Simple</h4>
                          <div className="space-y-4">
                            <div className="bg-rose-50 rounded-lg p-4">
                              <p className="text-rose-800 font-medium">
                                "Your smile lights up my day,<br/>
                                In my heart you'll always stay"
                              </p>
                            </div>
                            <div className="bg-pink-50 rounded-lg p-4">
                              <p className="text-pink-800 font-medium">
                                "Like stars that shine so bright,<br/>
                                You make everything feel right"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-pink-200 slide-in-right glow-animation">
                        <div className="text-center">
                          <div className="text-4xl mb-3 bounce-gentle">🦋</div>
                          <h4 className="text-xl font-bold text-pink-700 mb-4 heartbeat-animation">Cute & Playful</h4>
                          <div className="space-y-4">
                            <div className="bg-pink-50 rounded-lg p-4">
                              <p className="text-pink-800 font-medium">
                                "My paglii, my sweet delight,<br/>
                                You make my world so bright"
                              </p>
                            </div>
                            <div className="bg-rose-50 rounded-lg p-4">
                              <p className="text-rose-800 font-medium">
                                "Bhumiigulla, angel divine,<br/>
                                Forever grateful you are mine"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special message about the couplets */}
                    <div className="mt-8 text-center fade-in-up">
                      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-red-100 rounded-2xl p-8 shadow-lg border-2 border-rose-200 glow-animation">
                        <div className="text-5xl mb-4 heartbeat-animation">💝</div>
                        <h4 className="text-2xl font-bold text-rose-700 mb-4 rainbow-animation">
                          Why I Write These For You
                        </h4>
                        <div className="space-y-4 max-w-2xl mx-auto">
                          <p className="text-lg text-gray-800 font-medium leading-relaxed">
                            "Sometimes the biggest feelings fit in the smallest words"
                          </p>
                          <p className="text-gray-700 italic">
                            Each couplet is a tiny love letter, capturing moments when my heart overflows thinking of you.
                            They're simple because the truest feelings don't need fancy words - just honesty.
                          </p>
                          <p className="text-rose-700 font-semibold sparkle-animation">
                            Every rhyme beats in sync with my heart saying your name 💕
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive element - click to reveal more couplets */}
                    <div className="mt-8 text-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pink-200 glow-animation">
                        <div className="text-3xl mb-3 bounce-gentle">💌</div>
                        <h5 className="text-lg font-semibold text-pink-700 mb-3">Hidden Couplet Treasure</h5>
                        <p className="text-gray-600 text-sm mb-4">
                          Search for "couplet" on this page to find a special hidden message just for you!
                        </p>
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 border border-pink-200">
                          <p className="text-pink-700 font-medium text-sm sparkle-animation">
                            💡 Hint: Use Ctrl+F and type "couplet" to discover my secret verse
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden searchable couplet */}
                  <div className="hidden-couplet-terms">
                    <span className="opacity-0 absolute -z-10">couplet</span>
                    <span className="opacity-0 absolute -z-10">poem</span>
                    <span className="opacity-0 absolute -z-10">verse</span>
                    <span className="opacity-0 absolute -z-10">rhyme</span>
                  </div>
                </CardContent>
              </Card>

              {/* Her Innocence Section */}
              <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-xl mb-8 border-2 border-purple-200 slide-in-left glow-animation">
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Floating Angel Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-white opacity-20 sparkle-animation"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          fontSize: `${Math.random() * 12 + 8}px`,
                        }}
                      >
                        ✨
                      </div>
                    ))}

                    {/* Floating Angels */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`angel-${i}`}
                        className="absolute text-purple-200 opacity-30 float-animation"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 6}s`,
                          fontSize: `${Math.random() * 16 + 12}px`,
                        }}
                      >
                        👼
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-8 relative z-10 fade-in-up">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4 shadow-lg float-animation">
                      <span className="text-2xl">👼</span>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 rainbow-animation">
                      My Angel's Innocence
                    </h2>
                    <p className="text-gray-600 italic bounce-gentle">The purest soul that melts my heart</p>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-inner border border-purple-100 relative">
                    {/* Decorative clouds */}
                    <div className="absolute top-4 right-4 text-4xl opacity-30 float-animation">☁️</div>
                    <div className="absolute bottom-4 left-4 text-3xl opacity-30 float-animation">☁️</div>

                    <div className="text-center mb-6 slide-in-right">
                      <h3 className="text-xl font-semibold text-purple-700 mb-4 heartbeat-animation">
                        To My Precious Paglii 💕
                      </h3>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6 border-l-4 border-purple-400 fade-in-up glow-animation">
                        <p className="text-lg italic text-center leading-relaxed">
                          "You know <span className="font-semibold text-purple-600 sparkle-animation">meri paglii</span>
                          , kitni cute ho jaati ho tum, tumhe khud nahi pata kitni cute. It's like angels warming the
                          princess of heavens. My Darling, You know I smile with your smile, Awwwlyy smile on your
                          innocence. Listening your Order....huhhh............ I imagine you in me,
                          <span className="font-semibold text-pink-600 sparkle-animation">bhumiigulla</span> 👼✨"
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-200 slide-in-left glow-animation">
                          <div className="text-3xl mb-3 bounce-gentle">😇</div>
                          <h4 className="font-semibold text-purple-700 mb-2">Your Innocent Smile</h4>
                          <p className="text-sm text-gray-700">
                            The way you smile without knowing how it lights up my entire world
                          </p>
                        </div>

                        <div className="bg-pink-50 rounded-lg p-6 text-center border border-pink-200 slide-in-right glow-animation">
                          <div className="text-3xl mb-3 bounce-gentle">👑</div>
                          <h4 className="font-semibold text-pink-700 mb-2">Princess of Heavens</h4>
                          <p className="text-sm text-gray-700">
                            You carry yourself with such pure grace, like royalty from above
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-200 slide-in-left glow-animation">
                          <div className="text-3xl mb-3 bounce-gentle">🌟</div>
                          <h4 className="font-semibold text-blue-700 mb-2">My Cute Paglii</h4>
                          <p className="text-sm text-gray-700">
                            Your adorable silliness makes every moment with you magical
                          </p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-6 text-center border border-yellow-200 slide-in-right glow-animation">
                          <div className="text-3xl mb-3 bounce-gentle">💫</div>
                          <h4 className="font-semibold text-yellow-700 mb-2">Bhumiigulla</h4>
                          <p className="text-sm text-gray-700">
                            My special name for you, carrying all my love and tenderness
                          </p>
                        </div>
                      </div>

                      <div className="mt-12 mb-8" id="beautiful-words-section">
                        <div className="text-center mb-6 fade-in-up">
                          <h3 className="text-2xl font-semibold text-purple-700 mb-4 rainbow-animation">
                            Your Own Beautiful Words 💕
                          </h3>
                          <p className="text-gray-600 italic bounce-gentle">
                            The pure love that flows from your innocent heart
                          </p>
                          {musicStarted && (
                            <div className="mt-4 bg-white/80 rounded-xl p-4 shadow-lg border border-purple-200 glow-animation">
                              <div className="flex items-center justify-center gap-4 mb-3">
                                <button
                                  onClick={toggleMusic}
                                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 heartbeat-animation"
                                >
                                  {musicPlaying ? (
                                    <>
                                      <span className="text-lg">⏸️</span>
                                      <span className="text-sm font-medium">Pause Song</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-lg">▶️</span>
                                      <span className="text-sm font-medium">Play Song</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="flex items-center justify-center gap-3">
                                <span className="text-sm text-gray-600 sparkle-animation">🔊</span>
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={volume}
                                  onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                                  className="w-24 h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <span className="text-sm text-gray-600">{Math.round(volume * 100)}%</span>
                              </div>

                              <p className="text-center text-sm text-purple-600 italic mt-2 sparkle-animation">
                                🎵 {musicPlaying ? "Playing your special song..." : "Your special song is ready"} 🎵
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 shadow-lg slide-in-right glow-animation">
                          <div className="mb-4 text-center">
                            <p className="text-lg font-medium text-purple-700 mb-2 heartbeat-animation">
                              Messages From Your Heart
                            </p>
                            <p className="text-sm text-gray-600">
                              Your own words showing the depth of your innocent love
                            </p>
                          </div>

                          <div className="bg-white/80 rounded-xl p-4 shadow-inner float-animation">
                            <Image
                              src="/images/bhumii-messages.png"
                              alt="Your beautiful messages of love"
                              width={600}
                              height={800}
                              className="rounded-lg mx-auto shadow-md w-full max-w-md glow-animation"
                            />
                          </div>

                          <div className="mt-6 text-center">
                            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 inline-block max-w-2xl bounce-gentle">
                              <p className="text-gray-800 font-medium mb-2">
                                "You are my home... You are my everything... You are my whole universe"
                              </p>
                              <p className="text-sm text-gray-600 italic">
                                These words from your pure heart show exactly why I call you my innocent angel 👼
                              </p>
                            </div>

                          <div className="grid md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-pink-100 rounded-lg p-4 text-center slide-in-left glow-animation">
                              <div className="text-2xl mb-2 bounce-gentle">🏠</div>
                              <p className="text-sm font-medium text-pink-700">"You are my home"</p>
                              <p className="text-xs text-gray-600">
                                Your innocent way of expressing safety and belonging
                              </p>
                            </div>

                            <div className="bg-purple-100 rounded-lg p-4 text-center slide-in-right glow-animation">
                              <div className="text-2xl mb-2 bounce-gentle">🌌</div>
                              <p className="text-sm font-medium text-purple-700">"My whole universe"</p>
                              <p className="text-xs text-gray-600">The pure, unlimited love in your heart</p>
                            </div>

                            <div className="bg-blue-100 rounded-lg p-4 text-center slide-in-left glow-animation">
                              <div className="text-2xl mb-2 bounce-gentle">💓</div>
                              <p className="text-sm font-medium text-blue-700">"My heartbeats"</p>
                              <p className="text-xs text-gray-600">How innocently you express that I'm your life</p>
                            </div>

                            <div className="bg-green-100 rounded-lg p-4 text-center slide-in-right glow-animation">
                              <div className="text-2xl mb-2 bounce-gentle">🥺</div>
                              <p className="text-sm font-medium text-green-700">"Please don't leave me"</p>
                              <p className="text-xs text-gray-600">Your vulnerable, innocent plea from the heart</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 text-center fade-in-up">
                        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-full p-6 inline-block glow-animation">
                          <p className="text-lg font-medium text-gray-800 heartbeat-animation">
                            Your innocence is the most beautiful thing about you 💝
                          </p>
                          <p className="text-sm text-gray-600 mt-2 italic sparkle-animation">
                            Never lose that pure heart of yours, my angel
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden searchable terms for this section */}
                  <div className="hidden-innocence-terms">
                    <span className="opacity-0 absolute -z-10">paglii</span>
                    <span className="opacity-0 absolute -z-10">bhumiigulla</span>
                    <span className="opacity-0 absolute -z-10">innocent</span>
                    <span className="opacity-0 absolute -z-10">angel</span>
                    <span className="opacity-0 absolute -z-10">cute</span>
                  </div>
                </CardContent>
              </Card>

              {/* Main Love Letter */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl mb-8 slide-in-right glow-animation">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none text-gray-800">
                    <p className="text-xl leading-relaxed mb-6 fade-in-up">My Beautiful Girl,</p>

                    <p className="leading-relaxed mb-4 slide-in-left">
                      As I write this, I can't help but smile thinking about you. Every day with you feels like a new
                      adventure, and every moment apart makes me appreciate you even more. You've brought so much light
                      into my life, and I want you to know how deeply you're loved.
                    </p>

                    <p className="leading-relaxed mb-4 slide-in-right">
                      I love the way you laugh at my silly jokes, how you make everything better just by being there,
                      and how you see the world with such beautiful eyes. You're not just my girlfriend – you're my best
                      friend, my confidant, and my greatest blessing.
                    </p>

                    <p className="leading-relaxed mb-4 slide-in-left">
                      On this special girlfriend day, I want you to remember that you're cherished beyond words.
                      Distance might separate us sometimes, but nothing can diminish the love I have for you. You're
                      always in my thoughts, always in my heart.
                    </p>

                    <div className="bg-pink-50 border-l-4 border-pink-400 p-4 my-6 italic glow-animation">
                      <p className="text-pink-800 heartbeat-animation">
                        "If I could give you one thing in life, I would give you the ability to see yourself through my
                        eyes. Only then would you realize how special you are to me." 💕
                      </p>
                    </div>

                    <p className="leading-relaxed mb-6 slide-in-right">
                      Thank you for being you – for your kindness, your strength, your beautiful soul. Thank you for
                      choosing to love me and for letting me love you back.
                    </p>

                    <p className="text-xl text-center font-semibold text-pink-600 rainbow-animation">
                      Forever yours,
                      <br />
                      With all my love ❤️
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Final Surprise Message */}
              <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 shadow-xl mb-8 fade-in-up glow-animation">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4 heartbeat-animation">💕</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 rainbow-animation">
                    You've Reached the End, My Love
                  </h3>
                  <p className="text-lg text-gray-700 mb-4 bounce-gentle">
                    But this is just the beginning of our forever story...
                  </p>
                  <div className="bg-white/80 rounded-xl p-6 shadow-inner">
                    <p className="text-gray-800 font-medium mb-2 sparkle-animation">
                      "Every love story is beautiful, but ours is my favorite" 💖
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Thank you for being the most amazing girlfriend in the world, Bhumii 🌟
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Hidden Searchable Messages */}
              <div className="hidden-messages">
                {/* Hidden hug messages */}
                <span className="opacity-0 absolute -z-10">hug</span>
                <span className="opacity-0 absolute -z-10">hug me tight</span>
                <span className="opacity-0 absolute -z-10">virtual hug</span>

                {/* Hidden kiss messages */}
                <span className="opacity-0 absolute -z-10">kiss</span>
                <span className="opacity-0 absolute -z-10">sweet kiss</span>
                <span className="opacity-0 absolute -z-10">goodnight kiss</span>

                {/* Hidden love messages */}
                <span className="opacity-0 absolute -z-10">love you forever</span>
                <span className="opacity-0 absolute -z-10">my love</span>
                <span className="opacity-0 absolute -z-10">endless love</span>

                {/* Hidden romantic words */}
                <span className="opacity-0 absolute -z-10">beautiful</span>
                <span className="opacity-0 absolute -z-10">princess</span>
                <span className="opacity-0 absolute -z-10">angel</span>
                <span className="opacity-0 absolute -z-10">sunshine</span>
                <span className="opacity-0 absolute -z-10">treasure</span>

                {/* Hidden treasure messages */}
                <span className="opacity-0 absolute -z-10">precious</span>
                <span className="opacity-0 absolute -z-10">treasure</span>
                <span className="opacity-0 absolute -z-10">priceless</span>
                <span className="opacity-0 absolute -z-10">gift</span>
                <span className="opacity-0 absolute -z-10">thoughtful</span>
              </div>

              {/* Hidden Messages Section */}
              <Card className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-xl fade-in-up glow-animation">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 rainbow-animation">Secret Treasure Hunt 🔍</h3>
                    <p className="text-gray-600 mb-4 bounce-gentle">
                      I've hidden romantic words throughout this page just for you...
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-lg p-6 mb-6 slide-in-left">
                    <h4 className="font-semibold text-gray-800 mb-3 heartbeat-animation">
                      How to find hidden messages:
                    </h4>
                    <ol className="text-left text-gray-700 space-y-2">
                      <li>
                        1. Press <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Ctrl + F</kbd> (or
                        <kbd className="bg-gray-200 px-2 py-1 rounded text-sm">Cmd + F</kbd> on Mac)
                      </li>
                      <li>2. Search for these special words:</li>
                    </ol>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      <div className="bg-pink-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-pink-700">hug</span>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-purple-700">kiss</span>
                      </div>
                      <div className="bg-red-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-red-700">love</span>
                      </div>
                      <div className="bg-yellow-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-yellow-700">beautiful</span>
                      </div>
                      <div className="bg-green-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-green-700">princess</span>
                      </div>
                      <div className="bg-blue-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-blue-700">sunshine</span>
                      </div>
                      <div className="bg-indigo-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-indigo-700">paglii</span>
                      </div>
                      <div className="bg-rose-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-rose-700">bhumiigulla</span>
                      </div>
                      <div className="bg-cyan-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-cyan-700">innocent</span>
                      </div>
                      <div className="bg-amber-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-amber-700">precious</span>
                      </div>
                      <div className="bg-yellow-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-yellow-700">treasure</span>
                      </div>
                      <div className="bg-orange-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-orange-700">priceless</span>
                      </div>
                      <div className="bg-rose-100 rounded-lg p-3 text-center glow-animation">
                        <span className="font-medium text-rose-700">couplet</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center sparkle-animation">
                    <p className="text-sm text-gray-600 italic">
                      Each word you find is a piece of my heart speaking to you 💝
                    </p>
                  </div>

                  {/* Visible romantic messages that will be highlighted when searched */}
                  <div className="mt-8 space-y-4">
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        When you search for "<span className="font-semibold text-pink-600 sparkle-animation">hug</span>
                        ", imagine my arms wrapping around you right now 🤗
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-right glow-animation">
                      <p className="text-gray-700">
                        Every "<span className="font-semibold text-purple-600 sparkle-animation">kiss</span>" I send
                        through this screen is filled with all my love 💋
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        My "<span className="font-semibold text-red-600 heartbeat-animation">love</span>" for you grows
                        stronger with each passing day ❤️
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-right glow-animation">
                      <p className="text-gray-700">
                        You are the most "
                        <span className="font-semibold text-yellow-600 sparkle-animation">beautiful</span>" person
                        inside and out ✨
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        My "<span className="font-semibold text-green-600 bounce-gentle">princess</span>", you deserve
                        all the happiness in the world 👑
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-right glow-animation">
                      <p className="text-gray-700">
                        You are my "<span className="font-semibold text-blue-600 sparkle-animation">sunshine</span>" on
                        even the cloudiest days ☀️
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        My "<span className="font-semibold text-indigo-600 heartbeat-animation">paglii</span>", your
                        silly cuteness makes my heart skip beats 💕
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-right glow-animation">
                      <p className="text-gray-700">
                        "<span className="font-semibold text-rose-600 sparkle-animation">Bhumiigulla</span>", my special
                        name that holds all my love for you 🌸
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        Your "<span className="font-semibold text-cyan-600 bounce-gentle">innocent</span>" heart is what
                        makes you so incredibly special 👼
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        When you search for "
                        <span className="font-semibold text-amber-600 sparkle-animation">precious</span>", know that you
                        gave me the most precious gift of all - your love 💎
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-right glow-animation">
                      <p className="text-gray-700">
                        My greatest "<span className="font-semibold text-yellow-600 heartbeat-animation">treasure</span>
                        " isn't gold or diamonds - it's your thoughtful heart 💛
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        Your gift was "
                        <span className="font-semibold text-orange-600 sparkle-animation">priceless</span>" because it
                        came from the most beautiful soul 🌟
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-4 text-center slide-in-left glow-animation">
                      <p className="text-gray-700">
                        When you search for "<span className="font-semibold text-rose-600 sparkle-animation">couplet</span>
                        ", here's my secret verse: "In every word I write for you, my love grows deeper, pure and true" 💕
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )\
}
