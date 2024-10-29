import React, { useEffect, useState, useRef } from "react";
import OpenAI from "openai";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import ReactLoading from "react-loading";
import Rodal from "rodal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "rodal/lib/rodal.css";
import "regenerator-runtime/runtime";

import { useRecordVoice } from "@/hooks/useRecordVoice";
import { ChatCompletionMessageParam } from "openai/src/resources/chat";

interface ResultModel {
    fluency_and_coherence: number;
    lexical_resource: number;
    grammar: number;
    pronunciation: number;
    ielts_score: number;
}
export default function TestSpeaking({
    username,
    openai_api_key,
}: {
    username: string;
    openai_api_key: string;
}) {
    const { startRecording, stopRecording, base64 } = useRecordVoice();

    const openai = new OpenAI({
        apiKey: openai_api_key,
        dangerouslyAllowBrowser: true,
    });

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [chatLogs, setChatLogs] = useState<ChatCompletionMessageParam[]>([]);
    const TIME = 90;

    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [showResultModal, setShowResultModal] = useState<boolean>(false);
    const [isResultReady, setIsResultReady] = useState<boolean>(false);

    const [result, setResult] = useState<ResultModel | null>();

    const [isFirst, setIsFirst] = useState<boolean>(true);

    const [errorResult, setErrorResult] = useState<{
        isErrorResult: boolean;
        message: string;
    }>({
        isErrorResult: false,
        message: "",
    });

    useEffect(() => {
        generateQuestion(username);
        setIsFirst(false);
    }, []);

    const handleStopListening = () => {
        stopRecording();
        SpeechRecognition.stopListening();
        console.log("stop listening");
    };

    const handleStartListening = () => {
        startRecording();
        SpeechRecognition.startListening({
            continuous: true,
            language: "en-US",
        });
        console.log("start listening");
        setTimeLeft(TIME);
    };

    useEffect(() => {
        if (listening) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        handleStopListening();
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setTimeLeft(TIME);
        }
    }, [listening]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop =
                scrollContainerRef.current.scrollHeight;
        }
    }, [JSON.stringify(chatLogs)]);

    useEffect(() => {
        console.log(transcript);
        if (!listening && chatLogs.length > 0) {
            generateQuestion();
        }
    }, [base64]);

    useEffect(() => {
        const getResult = async () => {
            setIsResultReady(false);
            const maxAttempt = 10;
            console.log("getting Result...");
            let isDone = false;

            for (let i = 0; i < maxAttempt; i++) {
                try {
                    console.log("attempt :", i);
                    const response = await fetch(route("api.evaluate"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user: username,
                        }),
                    });

                    const data = await response.json();
                    console.log("data :", data);
                    setResult(data);
                    setIsResultReady(true);
                    isDone = true;

                    if (isDone) {
                        console.log("done");
                        break;
                    }
                } catch (err: unknown) {
                    console.log("Error :", err);
                    console.log("retrying :", i);
                    setErrorResult({
                        isErrorResult: false,
                        message: `Trying gathering your results for ${i} times.`,
                    });

                    const isLastAttempt = i + 1 === maxAttempt;
                    if (isLastAttempt) {
                        setErrorResult({
                            isErrorResult: true,
                            message:
                                "We can not retrieve your results, please check your internet connection!",
                        });
                    }
                }
            }
        };

        if (showResultModal) {
            getResult();
        }
    }, [showResultModal]);

    const generateQuestion = async (uname?: string) => {
        console.log("generate question...");
        const prompt = {
            role: "assistant",
            content:
                transcript !== ""
                    ? `generate one question without quotes marks according to to response statement : ${transcript}`
                    : "generate one question that commonly used in IELTS without quotes marks",
        } as ChatCompletionMessageParam;

        const completion = await openai.chat.completions.create({
            messages: [...chatLogs, prompt],
            model: "gpt-3.5-turbo-0125",
        });

        const newQuestion = completion.choices[0].message.content;

        if (chatLogs.length > 0) {
            setChatLogs([
                ...chatLogs,
                { role: "user", content: transcript },
                { role: "assistant", content: newQuestion },
            ]);
        } else {
            setChatLogs([
                ...chatLogs,
                { role: "assistant", content: newQuestion },
            ]);
        }
        fetch(route("api.text-to-speech"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isInit: uname ? true : false,
                text: completion.choices[0].message.content,
                audio: base64,
                user: uname || username,
                answer: transcript,
                chatLogs: chatLogs,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const audio = document.getElementById(
                    "MyAudio",
                ) as HTMLAudioElement;
                audio?.removeAttribute("src");
                audio.src = data.src;
                audio.play();
            });

        resetTranscript();
    };

    return (
        <div className="flex w-[100vw] h-[100vh] flex-col px-20 py-12 gap-10 bg-white">
            <section className="w-[100%] max-w-[1300px] h-[90%] mx-auto flex justify-center items-center flex-col relative rounded-3xl shadow-2xl shadow-sky-400/50">
                <div
                    className="w-[100%] h-[100%] p-5 overflow-y-scroll flex flex-col gap-3"
                    style={{ scrollbarWidth: "none" }}
                    ref={scrollContainerRef}
                >
                    {chatLogs.map((chat, index) => (
                        <div key={index} className="flex">
                            {chat.role === "assistant" ? (
                                <div
                                    className="bg-blue-400 px-6 py-5 text-lg text-white"
                                    style={{
                                        borderRadius: "50px",
                                        borderTopLeftRadius: 0,
                                        marginBottom: "5px",
                                    }}
                                >
                                    <p>{String(chat.content ?? "")}</p>
                                </div>
                            ) : (
                                <div
                                    className="bg-blue-200 px-6 py-5 text-lg text-blue-400 min-w-[75px] max-w-[500px] ml-auto"
                                    style={{
                                        borderRadius: "50px",
                                        borderTopRightRadius: 0,
                                        marginBottom: "5px",
                                    }}
                                >
                                    {
                                        <p className="text-end">
                                            {typeof chat.content === 'string' ? chat.content : JSON.stringify(chat.content)}
                                        </p>
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                    {listening && (
                        <div
                            className="px-6 py-5 text-lg text-blue-400 min-w-[75px] max-w-[500px] ml-auto"
                            style={{
                                borderRadius: "50px",
                                borderTopRightRadius: 0,
                                marginBottom: "5px",
                            }}
                        >
                            {listening ? (
                                <div className="relative w-[100px] h-[100px]">
                                    <CircularProgressbar
                                        value={timeLeft}
                                        maxValue={TIME}
                                        text={`${timeLeft}`}
                                    />
                                </div>
                            ) : (
                                <p className="text-end">.....</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-[2%] h-[100%] bg-white absolute right-0"></div>
            </section>

            <section className="flex w-[100%] max-w-[1300px] mx-auto justify-between ">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center items-center gap-5">
                    <button
                        type="button"
                        className={`w-[100px] flex flex-col justify-center items-center text-red-700 bg-white focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-20 py-2.5 mr-2 mb-2 ${!listening ? "" : "hover:bg-red-200"}`}
                        onClick={handleStopListening}
                    >
                        <svg
                            fill="#ff2424"
                            height="50px"
                            width="50px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M336,320 c0,8.837-7.163,16-16,16H192c-8.837,0-16-7.163-16-16V192c0-8.837,7.163-16,16-16h128c8.837,0,16,7.163,16,16V320z"></path>{" "}
                            </g>
                        </svg>
                        Stop
                    </button>

                    <button
                        type="button"
                        disabled={listening}
                        className="flex flex-col justify-center items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-[100px] p-3"
                        onClick={handleStartListening}
                    >
                        {listening ? (
                            <>
                                <svg
                                    className="animate-pulse"
                                    viewBox="0 0 24 24"
                                    width="50px"
                                    height="50px"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M6 9.85986V14.1499"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                        <path
                                            d="M9 8.42993V15.5699"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                        <path
                                            d="M12 7V17"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                        <path
                                            d="M15 8.42993V15.5699"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                        <path
                                            d="M18 9.85986V14.1499"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="#ffffff"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>{" "}
                                    </g>
                                </svg>
                                <p>Recording...</p>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="mb-2"
                                    fill="#ffffff"
                                    height="50px"
                                    width="50px"
                                    version="1.1"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 60 60"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                            {" "}
                                            <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>{" "}
                                            <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                                <p>Start</p>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex-1 flex justify-end">
                    <button
                        type="button"
                        className="flex flex-col justify-center items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-5 mb-2 w-[100px]"
                        onClick={() => setShowResultModal(true)}
                    >
                        <svg
                            viewBox="0 0 512 512"
                            width="50px"
                            height="50px"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <title>report-barchart</title>{" "}
                                <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    {" "}
                                    <g
                                        id="add"
                                        fill="#ffffff"
                                        transform="translate(42.666667, 85.333333)"
                                    >
                                        {" "}
                                        <path
                                            d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666,234.666 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z"
                                            id="Combined-Shape"
                                        >
                                            {" "}
                                        </path>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </g>
                        </svg>
                        Get the Result
                    </button>
                </div>
            </section>

            <section className="flex justify-center">
                <div>
                    {browserSupportsSpeechRecognition &&
                        browserSupportsSpeechRecognition}
                </div>
            </section>

            <section>
                <audio id="MyAudio" src="" />
            </section>
            <Rodal
                animation="zoom"
                visible={showResultModal}
                width={1424 * 0.5}
                height={1424 * 0.65}
                onClose={() => setShowResultModal(false)}
            >
                <div className="relative h-full w-full my-auto flex justify-center flex-col">
                    <div>
                        {isResultReady ? (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-center text-blue-400 text-5xl font-bold">
                                    Your Overal Score of Speaking Test
                                </h1>
                                <p className="text-center mt-3 mb-8 text-slate-400">
                                    Based on IELTS marketing criteria
                                </p>
                                <table className="min-w-full h-full border border-gray-300 divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                            >
                                                Criteria
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                            >
                                                Score
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 text-gray-700">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-800">
                                                Fluency and Coherence
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end items-center">
                                                    <div className="mr-4 text-sm text-gray-600">
                                                        {result?.fluency_and_coherence ??
                                                            0}
                                                        %
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                        }}
                                                    >
                                                        <CircularProgressbar
                                                            value={
                                                                result?.fluency_and_coherence ??
                                                                0
                                                            }
                                                            styles={buildStyles(
                                                                {
                                                                    pathColor: `#3b82f6`,
                                                                    textColor:
                                                                        "#3b82f6",
                                                                },
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-800">
                                                Lexical Resource
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end items-center">
                                                    <div className="mr-4 text-sm text-gray-600">
                                                        {result?.lexical_resource ??
                                                            0}
                                                        %
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                        }}
                                                    >
                                                        <CircularProgressbar
                                                            value={
                                                                result?.lexical_resource ??
                                                                0
                                                            }
                                                            styles={buildStyles(
                                                                {
                                                                    pathColor: `#10b981`,
                                                                    textColor:
                                                                        "#10b981",
                                                                },
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-800">
                                                Grammatical Range and Accuracy
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end items-center">
                                                    <div className="mr-4 text-sm text-gray-600">
                                                        {result?.grammar ?? 0}%
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                        }}
                                                    >
                                                        <CircularProgressbar
                                                            value={
                                                                result?.grammar ??
                                                                0
                                                            }
                                                            styles={buildStyles(
                                                                {
                                                                    pathColor: `#ef4444`,
                                                                    textColor:
                                                                        "#ef4444",
                                                                },
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-left font-medium text-gray-800">
                                                Pronunciation
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end items-center">
                                                    <div className="mr-4 text-sm text-gray-600">
                                                        {result?.pronunciation ??
                                                            0}
                                                        %
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                        }}
                                                    >
                                                        <CircularProgressbar
                                                            value={
                                                                result?.pronunciation ??
                                                                0
                                                            }
                                                            styles={buildStyles(
                                                                {
                                                                    pathColor: `#f59e0b`,
                                                                    textColor:
                                                                        "#f59e0b",
                                                                },
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-left font-semibold text-gray-900">
                                                Final IELTS Score
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-bold text-blue-600">
                                                {result?.ielts_score ?? 0}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <>
                                {errorResult.isErrorResult ? (
                                    // TODO: Make It To Can Show Error
                                    <div>ERROR.....</div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center my-auto">
                                        <div className="flex flex-col items-center gap-5">
                                            <ReactLoading
                                                color="#1964AD"
                                                type="spin"
                                            />
                                            <p className="text-slate-500">
                                                Getting your results...
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="absolute right-2 bottom-2 flex flex-end text-lg">
                            {isResultReady ? (
                                <button
                                    type="button"
                                    className="inline-flex flex-end px-10 py-2 font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                        setShowResultModal(false);
                                    }}
                                >
                                    Close
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="inline-flex flex-end px-10 py-2 font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                        setShowResultModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Rodal>
        </div>
    );
}
