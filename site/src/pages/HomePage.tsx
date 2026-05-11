import HeroSection from '../components/home/HeroSection'
import ChapterGrid from '../components/home/ChapterGrid'
import LearningPath from '../components/home/LearningPath'
import RecentUpdates from '../components/home/RecentUpdates'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ChapterGrid />
      <LearningPath />
      <RecentUpdates />
    </div>
  )
}
