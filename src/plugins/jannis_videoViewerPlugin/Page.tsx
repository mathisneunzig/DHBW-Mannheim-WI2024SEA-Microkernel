import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import AddCatVideo from "./../../components/AddCatVideo";

export const VideoViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    // array of videos existing in the provider
    const videos = (ctx.read.entity("videos") as { title: string; likes: number; additional_information: string; url: string }[]) ?? [];
    const users = ctx.read.users();

    // States
    const [showAddCatVideo, setShowAddCatVideo] = useState(false);
    const [addInfoText, setAddInfoText] = useState("");
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    
    function likeVideo(video: any) {
        ctx.write.exec("videos", "like", {url: video.url});
    };

    function removeVideo(video: any) {
        ctx.write.exec("videos", "remove", {url: video.url});
    }

    return (
        <div>
            <div style={{backgroundColor: "#e1f4fd", paddingLeft: "1rem", paddingTop: "1rem", borderRadius: "0.5rem", paddingBottom: "1rem"}}>
                <div style={{display: "inline-block"}}>
                    <h1>Cat Video Viewer -  (^･o･^)</h1>   
                    <p>Hello {users[0]?.firstName ?? "NoName"}, have a look at the cat videos!</p>
                    <button onClick={() => setShowAddCatVideo(true)} disabled={!ctx.can("videos.write")}>Add cat video</button>
                    <AddCatVideo show={showAddCatVideo} close={() => setShowAddCatVideo(false)}>
                        <div style={{display: "grid"}}>
                            <label style={{gridColumn: 1, gridRow: 1, marginBottom: "1rem", marginTop: "1rem"}}>Title:</label>
                            <input style={{gridColumn: 2, gridRow: 1, marginBottom: "1rem", marginTop: "1rem"}} type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
                            <label style={{gridColumn: 1, gridRow: 2, marginBottom: "1rem"}}>Link:</label>
                            <input style={{gridColumn: 2, gridRow: 2, marginBottom: "1rem"}} type="text" value={link} onChange={e => setLink(e.target.value)} pattern="https://www\.youtube\.com/watch\?v=[A-Za-z0-9]+" placeholder="Youtube link"/>
                            <label style={{gridColumn: 1, gridRow: 3, marginBottom: "1rem", marginRight: "0.5rem"}}>Description:</label>
                            <input style={{gridColumn: 2, gridRow: 3, marginBottom: "1rem"}} type="text" value={additionalInformation} onChange={e => setAdditionalInformation(e.target.value)} placeholder="Description"/>
                            <p style={{gridColumn: 2, gridRow: 4}}>{addInfoText}</p>
                            <button style={{gridColumn: 2, gridRow: 5, marginBottom: "1rem"}} onClick={() => {
                                let validLink = /https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9]+/.test(link);
                                if (!validLink) {
                                    setAddInfoText("The link provided is not a link to a youtube video!");
                                    return;
                                }

                                //Add video
                                const t = title.trim();
                                const l = link.trim();
                                const aI = additionalInformation.trim();

                                if (t && l && aI) {
                                    ctx.write.exec("videos", "add", {title: t, link: l, additionalInformation: aI});
                                    //Close popup
                                    setShowAddCatVideo(false);
                                } else {
                                    setAddInfoText("Please fill all fields");
                                }
                            }}>Submit</button>
                        </div>
                    </AddCatVideo>
                </div>
                <div style={{display: "inline-block", float: "right", marginTop: "2rem"}}>
                    <img src="/cute_cat.png" alt="Cute cat laying on a bed" style={{width: "30%", float: "right", marginRight: "2rem"}} />
                </div>
            </div>
            <hr />
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
                {videos.map(video => (
                    <div style={{backgroundColor: "#83dbf6", marginRight: "1rem", paddingLeft: "0.5rem", paddingBottom: "1rem", borderRadius: "0.25rem"}}>
                        <p style={{fontSize: 22, fontWeight: "bold"}}>{video.title}</p>
                        <div style={{display: "flex"}}>
                            <button style={{marginLeft: "0.5rem", border: "None", backgroundColor: "#18b2df", textAlign: "center", borderRadius: "1rem", padding: "1rem"}} onClick={() => likeVideo(video)}>
                                <img style={{verticalAlign: "sub"}} src="/thumb_up_mui.svg" alt="Thumb up" /> {video.likes}
                            </button>
                            <button style={{marginLeft: "2rem", backgroundColor: "#18b2df", width: "5rem", borderRadius: "1rem", borderStyle: "none"}} onClick={() => window.open(video.url, "_blank")?.focus()}>
                                <img  style={{padding: "0.5rem"}} src="/smart_display_mui.svg" alt="Play video" />
                            </button>
                            <button style={{marginLeft: "2rem", backgroundColor: "#18b2df", width: "5rem", borderRadius: "1rem", borderStyle: "none"}} onClick={() => removeVideo(video)}>
                                <img  style={{padding: "0.5rem"}} src="/delete_mui.svg" alt="Delte video" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};