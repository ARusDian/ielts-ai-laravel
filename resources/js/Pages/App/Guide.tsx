import React from 'react';

const Guide: React.FC = () => {
  return (

    <div className='w-100 h-100 ' style={{ margin: '0', padding: '0' }}>


      <div className="container my-5">
        <a href="/" className='text-primary mr-4 d-flex gap-2'>

          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5303 5.46967C10.8232 5.76256 10.8232 6.23744 10.5303 6.53033L5.81066 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H5.81066L10.5303 17.4697C10.8232 17.7626 10.8232 18.2374 10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303L3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967Z" fill="#0d6efd"></path> </g></svg>

          Kembali</a>
        <h1 className="text-center mb-4 fs-2">IELTS Speaking Test Guide</h1>

        <div className="row">
          {/* Card 1 - Masukkan Nama dan Mulai Tes */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">1. Enter Your Name and Start the Speaking Test</h5>
                <p className="card-text">
                  The first step in using this IELTS web application is entering your name. This is essential as the name you provide will be used as your identity throughout the test and for result reporting. Once you’ve ensured your name is correct, you can begin the test by clicking the <strong>"Start Speaking Test"</strong> button. This button initiates the entire speaking test process. Ensure you have a stable internet connection and a functioning microphone before starting. The test will assess your English-speaking skills based on the questions presented. Be prepared to listen carefully before you speak.              </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Dengarkan Soal dengan Seksama */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">2. Listen Carefully to the Questions</h5>
                <p className="card-text">
                  After starting the test, the application will present the questions verbally. It is crucial to listen carefully to each question at this stage. Avoid rushing to answer before fully understanding the question. This is key to providing relevant and well-structured responses. Pay attention to the intonation and word choices in the questions. Missing an important part of the question may result in an incomplete or inaccurate answer. Ensure you are in a quiet environment free from distractions to focus fully on the questions.              </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Mulai Rekaman Jawaban */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">3. Start Recording Your Answers</h5>
                <p className="card-text">
                  When you’re ready to answer, the next step is to start recording. Click the <strong>"Start"</strong> button to begin recording your response. You will have 80 seconds for each question. Use this time wisely to give clear and structured answers. Avoid speaking too quickly or too slowly. Ensure your voice is clear and articulate, and maintain a steady tone to ensure your speech is fully captured in the recording.                </p>
              </div>
            </div>
          </div>

          {/* Card 4 - Berikan Jeda dan Pelafalan yang Tepat */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">4. Provide Proper Pauses and Pronunciation</h5>
                <p className="card-text">
                  While speaking, it is essential to pause appropriately between sentences. Avoid rushing through your entire response at once. Proper pauses not only make your answers sound more natural but also help the application analyze your pronunciation more accurately. Clear and correct pronunciation will enhance your score. Remember, an appropriate pace and precise enunciation will significantly improve your speaking test results.                </p>
              </div>
            </div>
          </div>

          {/* Card 5 - Menghentikan Rekaman */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">5. Stop the Recording</h5>
                <p className="card-text">
                  If you finish your response before the 80-second limit, you can manually stop the recording by clicking the <strong>"Stop"</strong> button. This will end the recording for that question, and you will be ready to move on to the next one. However, ensure your answer is complete and clear before stopping the recording. Ending the recording too early may result in missing important information. Use your time wisely and only stop when you are confident in your response.                </p>
              </div>
            </div>
          </div>

          {/* Card 6 - Lanjut ke Pertanyaan Berikutnya */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">6. Move on to the Next Question</h5>
                <p className="card-text">
                  Once you’ve answered one question, the application will automatically present the next one. This process will continue until all questions have been answered. For each new question, repeat the steps outlined in point 3: listen carefully, start recording, and provide a clear and structured answer. As you progress, aim to become more comfortable speaking in English and ensure your responses remain relevant to the topic given. The smoother your delivery, the better your final speaking assessment score.                </p>
              </div>
            </div>
          </div>

          {/* Card 7 - Menyelesaikan Tes dan Mendapatkan Hasil */}
          <div className="col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title font-bold">7. Complete the Test and Receive Your Results</h5>
                <p className="card-text">
                  After answering all the questions, or if you feel ready to end the test, click the <strong>"Get the Result"</strong> button. The application will begin evaluating your responses based on various parameters, including clarity, structure, pronunciation, and more. Once the analysis is complete, your speaking test results will be displayed. Use these results to gauge your English-speaking ability and identify areas for improvement. If the results are not as expected, you can retake the test and continue practicing to enhance your speaking skills.                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>


  );
};

export default Guide;
