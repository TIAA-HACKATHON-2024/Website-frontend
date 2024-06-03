import Hero from './components/Hero';
import FinancialLiteracy from './components/FinancialLiteracy'
import Chatbot from './components/Chatbot';
export default function Home() {
  return (
    <main>
      <div className="">
        <div id="home">
          <Hero/>
        </div>
        <div id="cards">
          <FinancialLiteracy/>
        </div>
        <div className='fixed bottom-[20px] right-[20px] z-20'>
            <Chatbot/>
        </div>
      </div>
    </main>
  );
}
