import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const VideoViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    // array of videos existing in the provider
    const videos = (ctx.read.entity("videos") as { title: string; likes: number; additional_information: string; url: string }[]) ?? [];
    const users = ctx.read.users();
    
    // Maybe change to inline to prevent type any being used
    function likeVideo(video: any) {
        ctx.write.exec("videos", "like", {url: video.url});
    };

    return (
        <div>
            <h1>Cat Video Viewer</h1>
            <p>Hello {users[0]?.firstName ?? "NoName"}</p>
            <div>
                {videos.map(video => (
                    <div style={{backgroundColor: "#b5bbb5ff"}}>
                        <p style={{fontSize: 30}}>{video.title}</p>
                        <p>Likes: {video.likes}</p>
                        <button onClick={() => likeVideo(video)}>Like this video</button>
                        <br />
                        <a href={video.url}>Go to cat :)</a>
                    </div>
                ))}
            </div>
        </div>
    );
};