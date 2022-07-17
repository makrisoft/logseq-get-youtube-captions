import { Caption } from 'youtube-captions-scraper'


function autoCastCaptions(captions: Caption[]): Caption[] {
    return captions.map((caption) => {
        return {start: Number(caption.start), dur: Number(caption.dur), text: caption.text}
    });
}
export function autoCompressCaptions(captions: Caption[]) {
    captions = autoCastCaptions(captions);
    const totalSeconds = captionsTotalSeconds(captions);
    const interval = secondsToInterval(totalSeconds);
    console.log(`total seconds: ${totalSeconds}, interval: ${interval}`);
    const compressedCaptions = compressCaptions(captions, interval);
    return compressedCaptions;
}

export function compressCaptions(captions: Caption[], captionInterval: number): Caption[] {
    interface CaptionGroup {
        dur: number;
        captions: Caption[];
    }

    interface CaptionReducer {
        captionGroup: CaptionGroup;
        allGroups: CaptionGroup[];
    }

    // combine captions into groups of captions that are within a certain time range
    const x = captions.reduce((acc: CaptionReducer, curr: Caption, _ci: number, _a: readonly Caption []) => {
        // console.log(curr);

        let { captionGroup, allGroups } = acc;

        const newGroupTime = captionGroup.dur + curr.dur;

        if (newGroupTime >= captionInterval) {
            allGroups.push(captionGroup);
            captionGroup = { dur: 0, captions: [] }
        } else {
            captionGroup.captions.push(curr);
            captionGroup.dur = newGroupTime;
        }

        return { captionGroup, allGroups };
    }, { captionGroup: { start: -1, dur: 0, captions: [] }, allGroups: [] } as CaptionReducer);

    if (x.captionGroup.captions.length > 0) {
        x.allGroups.push(x.captionGroup);
    }

    return x.allGroups.map((g) => {
        const resultCaption = {
            start: Math.trunc(g.captions[0].start),
            dur: g.captions.reduce((a,b) => a + b.dur, 0),
            text: g.captions.map((c) => c.text).join(" ")
        };

        return resultCaption;
    });
}

export function captionsTotalSeconds(captions: Caption[]): number {
    return Math.trunc(captions.reduce((a, b) => {
        console.log(a, " ", b.dur);
        return a + b.dur;
    }, 0));
}

export function secondsToInterval(seconds: number): number {
    // if its less than a minute, return 5 seconds
    if (seconds < 60) {
        return 5;
    } else if (seconds <= 10 * 60) {
        return 60;
    } else {
        return 5 * 60;
    }
}
