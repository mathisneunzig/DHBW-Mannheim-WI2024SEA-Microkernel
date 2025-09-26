import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const Trivia: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const question = (ctx.read.entity("question") as { id: string; question: string; answer: string }[]) ?? [];
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    if (question.length === 0) {
        return <p>No questions available</p>;
    }
    const NextQuestion = () => {
        setCurrentIndex((previous) => (previous + 1) % question.length);
        setShowAnswer(false);
    }
    const users = ctx.read.users();
    const [countAnsCorrect, setCountAnsCorrect] = useState(0);
    const AnswerCorrect = () => {
        setCountAnsCorrect((previous) => previous + 1);
    }
    const [triviaDone, setTriviaDone] = useState(false);

    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");

    const buttonStyle1 = {
        background: "linear-gradient(135deg, #00bfff, #4169e1)",
        color: "white",
        padding: "12px 24px",
        border: "2px solid white",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease"
    };
    const buttonStyle2 = {
        color: "white",
        padding: "12px 24px",
        border: "2px solid white",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease"
    };
    const AnswerField = {
        marginTop: "20px",
        padding: "15px",
        border: "2px solid #00bfff",
        borderRadius: "10px",
        backgroundColor: "#f0f8ff"
    }
    const ImgStyle = {
        width: "180px",
        height: "180px",
        verticalAlign: "middle",
        margin: "20px"
    }

    return (
        <>

            <div style={{
                display: "flex", flexDirection: "column", gap: "10px", maxWidth: "900px",
                width: "90%",
                margin: "0 auto",
                padding: "20px",
                minHeight: "100vh",
            }}>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "30px" }}>
                    <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsX29mZmljZV8zMl9hX3N0dWRpb19zaG90X29mX2FfY3V0ZV9jYXRfd2F2aW5nX2ltYWdlc2Z1bF82MmNiYjBkNy1iMDJlLTQyY2YtYTE3ZC04MmRkMzZjOWUxMGYucG5n.png" style={{ width: "80px", objectFit: "contain", margin: "15px" }}></img>
                    <h1 style={{
                        background: "linear-gradient(135deg, #00bfff, #4169e1)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        Hello {users[0]?.firstName ?? "World"}, welcome to Trivia!</h1>
                </div>

                <button onClick={() => { setTriviaDone(false); NextQuestion() }} style={buttonStyle1}>Next Question</button>
                {<p style={{ marginTop: "10px" }}>
                    {question.length > 0 ? question[currentIndex].question : "No more questions available."}
                </p>

                }

                {!showAnswer && (
                    <button onClick={() => {setTriviaDone(false); setShowAnswer(true)}} style={buttonStyle1}>See Answer</button>)}
                {showAnswer && (
                    <p style={AnswerField}>
                        {question.length > 0 ? question[currentIndex].answer : "No answer available."}
                    </p>
                )}

                <div style={{ display: "flex", gap: "2%", maxWidth: "900px", width: "100%", justifyContent: "center" }}>
                    <button
                        onClick={() => { AnswerCorrect(); NextQuestion() }}
                        disabled={!showAnswer}
                        style={{ ...buttonStyle2, backgroundColor: "#32cd32" }}>
                        I got it right
                        <img src="https://delavanlakesvet.com/wp-content/uploads/sites/195/2022/03/smiling-cat-for-web.jpg" style={ImgStyle} />
                    </button>
                    <button
                        onClick={NextQuestion}
                        disabled={!showAnswer}
                        style={{ ...buttonStyle2, backgroundColor: "#ff6347" }}>
                        I was wrong
                        <img src="https://people.com/thmb/aaQtgLVy5cJkYUSEQbpOlgWm5-4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(899x0:901x2):format(webp)/21042210_264995290674140_8840525631411191808_n-530848c0d1134a31bc03861ea9ddd700.jpg" style={ImgStyle} />
                    </button>
                </div>

                
                <button onClick={() => setTriviaDone(true)} style={{
                    ...buttonStyle1,
                    width: "156px",
                    height: "43.5px",
                    
                }}>I'm done quizzing</button>

                {triviaDone && (
                    <>
                        <div style={{ ...AnswerField, display: "flex", flexDirection: "row", gap: "20px", alignItems: "stretch", width: "100%" }}>
                            <div style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                gap: "12px" 
                            }}>
                                <h2 style={{ margin: 0, padding: 0, lineHeight: 1 }}>Your Score</h2>

                                <p style={{ margin: 0, padding: 0, lineHeight: 1.6 }}>
                                    {countAnsCorrect >= (question.length - countAnsCorrect)
                                        ? `Well done ${users[0]?.firstName ?? "World"}, you answered ${countAnsCorrect} out of ${question.length} questions correctly!`
                                        : `You answered ${countAnsCorrect} out of ${question.length} questions correctly. Maybe next time you will get better, good luck ${users[0]?.firstName ?? "World"}!`}
                                </p>
                            </div>

                            <div style={{
                                width: "220px",  
                                display: "flex",
                                alignItems: "center",     
                                justifyContent: "center"  
                            }}>
                                <img
                                    src={countAnsCorrect >= (question.length - countAnsCorrect)
                                        ? "https://portfoliocards.com/cdn/shop/files/NW506-gallery_blowup.jpg?v=1717062920"
                                        : "https://ih1.redbubble.net/image.4196315404.4674/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"}
                                    alt="result"
                                    style={{
                                        width: "180px",
                                        height: "180px",
                                        objectFit: "cover",
                                        display: "block",
                                        margin: 0,
                                        borderRadius: "6px"
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}


                <h2 style={{
                    background: "linear-gradient(135deg, #00bfff, #4169e1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    Do you want to add your own questions? </h2>
                <div style={{ display: "flex", width: "100%", gap: "0.5%", maxWidth: "900px", justifyContent: "center" }}>
                    <input value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="New Question" style={{ border: "1.5px solid #2094F0", borderRadius: "5px", width: "45%" }} />
                    <input value={newAnswer} onChange={e => setNewAnswer(e.target.value)} placeholder="New Answer" style={{ border: "1.5px solid #2094F0", borderRadius: "5px", width: "45%" }} />
                </div>
                <button onClick={() => {
                    if (newQuestion && newAnswer) {
                        ctx.write.exec("question", "add", { question: newQuestion, answer: newAnswer });
                        setNewQuestion("");
                        setNewAnswer("");
                    }
                }} style={buttonStyle1}>Add Question</button>
            </div>
        </>
    );
}
