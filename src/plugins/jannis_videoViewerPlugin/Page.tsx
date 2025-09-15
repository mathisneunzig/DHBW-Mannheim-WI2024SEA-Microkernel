import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import AddCatVideo from "./../../components/AddCatVideo";

export const VideoViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    // array of videos existing in the provider
    const videos = (ctx.read.entity("videos") as { title: string; likes: number; additional_information: string; url: string }[]) ?? [];
    const users = ctx.read.users();

    // States
    const [showAddCatVideo, setShowAddCatVideo] = useState(false);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    
    // Maybe change to inline to prevent type any being used
    function likeVideo(video: any) {
        ctx.write.exec("videos", "like", {url: video.url});
    };

    return (
        <div>
            <h1>Cat Video Viewer</h1>
            <p>Hello {users[0]?.firstName ?? "NoName"}, have a look at the cat videos!</p>
            <button onClick={() => setShowAddCatVideo(true)} disabled={!ctx.can("videos.write")}>Add cat video</button>
            <AddCatVideo show={showAddCatVideo} close={() => setShowAddCatVideo(false)}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} placeholder="Youtube link"/>
                <input type="text" value={additionalInformation} onChange={e => setAdditionalInformation(e.target.value)} placeholder="Description"/>
                <button onClick={() => {
                    //Add video
                    const t = title.trim();
                    const l = link.trim();
                    const aI = additionalInformation.trim();

                    if (t && l && aI) {
                        ctx.write.exec("videos", "add", {title: t, link: l, additionalInformation: aI});
                    }

                    //Close popup
                    setShowAddCatVideo(false);
                }}>Submit</button>
            </AddCatVideo>
            <hr />
            <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)"}}>
                {videos.map(video => (
                    <div style={{backgroundColor: "#b5bbb5ff", marginRight: "1rem", paddingLeft: "0.5rem", paddingBottom: "0.25rem", borderRadius: "5px"}}>
                        <p style={{fontSize: 22, fontWeight: "bold"}}>{video.title}</p>
                        <div style={{display: "flex"}}>
                            <p style={{fontWeight: 400}}><img style={{verticalAlign: "sub"}} src="/thumb_up_mui.svg" alt="Thumb up" /> {video.likes}</p>
                            <button style={{marginLeft: "3rem", border: "None", backgroundColor: "rgba(185, 255, 157, 1)", textAlign: "center", borderRadius: "3px", padding: "1rem"}} onClick={() => likeVideo(video)}>
                                Like this video
                            </button>
                        </div>
                        <br />
                        <a href={video.url} target="_blank">Go to cat :)</a>
                    </div>
                ))}
            </div>
        </div>
    );
};