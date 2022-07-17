import { describe, expect, it } from 'vitest'
import { Caption } from 'youtube-captions-scraper'
import { autoCompressCaptions, captionsTotalSeconds, compressCaptions, secondsToInterval } from './subtitle_ops';
import { readFileSync } from 'fs';

const CAPTIONS: Caption[] = [
    {
        start: 0,
        dur: 2.79,
        text: 'hey guys welcome back to the channel if'
    },
    {
        start: 1.469,
        dur: 2.46,
        text: "you're new here my name is Ellie I'm a"
    },
    {
        start: 2.79,
        dur: 2.67,
        text: 'final year medical student at Cambridge'
    },
    {
        start: 3.929,
        dur: 3.12,
        text: "University and today we're kicking off a"
    },
    {
        start: 5.46,
        dur: 2.88,
        text: "new series where I'm gonna be sharing"
    },
    { start: 7.049, dur: 2.791, text: 'with you evidenced-based' },
    {
        start: 8.34,
        dur: 2.759,
        text: "revision tips so I'm gonna be giving you"
    },
    {
        start: 9.84,
        dur: 3.12,
        text: 'advice on how you can prepare for your'
    },
    {
        start: 11.099,
        dur: 3.301,
        text: "exams but hopefully I'll be backing up"
    },
    {
        start: 12.96,
        dur: 3.06,
        text: 'everything I say with evidence from'
    },
    {
        start: 14.4,
        dur: 3.209,
        text: 'studies that have been done in the field'
    },
    {
        start: 16.02,
        dur: 3.21,
        text: 'of psychology one students like you and'
    },
    {
        start: 17.609,
        dur: 3.84,
        text: 'me over the last hundred years no one'
    },
    {
        start: 19.23,
        dur: 3.6,
        text: 'ever really teaches us how to study we'
    },
    {
        start: 21.449,
        dur: 3.691,
        text: 'tend to just go with what feels'
    },
    {
        start: 22.83,
        dur: 3.63,
        text: "intuitively right and as we'll see the"
    },
    {
        start: 25.14,
        dur: 3.36,
        text: 'research is shown that actually the'
    },
    {
        start: 26.46,
        dur: 3.93,
        text: 'techniques that students think are the'
    },
    {
        start: 28.5,
        dur: 2.699,
        text: 'most intuitive often tend not to be the'
    },
    {
        start: 30.39,
        dur: 2.4,
        text: 'ones that are actually the most'
    },
    {
        start: 31.199,
        dur: 2.671,
        text: "effective so if you've got exams coming"
    },
    {
        start: 32.79,
        dur: 2.609,
        text: 'up then hopefully by the end of this'
    },
    {
        start: 33.87,
        dur: 3.029,
        text: "video you'll pick up some techniques"
    },
    {
        start: 35.399,
        dur: 2.851,
        text: 'that you can apply to your own studies'
    },
    {
        start: 36.899,
        dur: 3.09,
        text: 'to make everything a little bit more'
    },
    {
        start: 38.25,
        dur: 2.82,
        text: "efficient and enjoyable so let's jump"
    },
    {
        start: 39.989,
        dur: 2.25,
        text: 'into it this is gonna be the structure'
    },
    {
        start: 41.07,
        dur: 2.88,
        text: "of the video firstly I'm gonna be"
    },
    {
        start: 42.239,
        dur: 3.691,
        text: 'talking about the three very popular'
    },
    {
        start: 43.95,
        dur: 3.72,
        text: 'revision techniques that are shown to be'
    },
    {
        start: 45.93,
        dur: 4.02,
        text: 'less effective in the literature namely'
    },
    {
        start: 47.67,
        dur: 3.9,
        text: 'rereading highlighting and making notes'
    },
    {
        start: 49.95,
        dur: 3.089,
        text: 'are summarizing those are by far the'
    },
    {
        start: 51.57,
        dur: 3.12,
        text: "most popular techniques but they're also"
    },
    {
        start: 53.039,
        dur: 2.941,
        text: 'not very effective if you look at the'
    },
    {
        start: 54.69,
        dur: 2.58,
        text: "evidence behind them secondly I'm gonna"
    },
    {
        start: 55.98,
        dur: 3,
        text: 'be introducing the concept of active'
    },
    {
        start: 57.27,
        dur: 3.539,
        text: 'recall which is by far the most powerful'
    },
    {
        start: 58.98,
        dur: 3.12,
        text: 'effective study technique and that'
    },
    {
        start: 60.809,
        dur: 3.301,
        text: 'involves like testing yourself and'
    },
    {
        start: 62.1,
        dur: 3.75,
        text: 'practicing retrieving information from'
    },
    {
        start: 64.11,
        dur: 2.67,
        text: 'your brain because the very act of'
    },
    {
        start: 65.85,
        dur: 2.43,
        text: 'retrieving information actually'
    },
    {
        start: 66.78,
        dur: 2.909,
        text: 'strengthens connections in the brain and'
    },
    {
        start: 68.28,
        dur: 3.3,
        text: "there's like a load of evidence behind"
    },
];

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
    // it.skip('makes a real request', async () => {
    //     const captions = await getSubtitles({ videoID: "ukLnPbIffxE", lang: "en" });
    //     expect(captions).toMatchSnapshot("captions");
    // });

    it('tests a saved fixture', () => {
        // load the fixture from the file system
        const captions = JSON.parse(readFileSync('src/fixtures/captions.json').toString()).
            map((caption: { start: string; dur: string; text: string; }) => {
                return {
                    start: Number(caption.start),
                    dur: Number(caption.dur),
                    text: caption.text
                };
            });

        console.log("Foo: ", captions.slice(0, 3));
        expect(captionsTotalSeconds(captions)).toEqual(2517);
        const result = autoCompressCaptions(captions);
        console.log(result.slice(2));
    });

    it('serial test', () => {
        const result = compressCaptions(CAPTIONS, 60);
        console.log('serial test', result);
    });

    it('tests captions total time', () => {
        expect(captionsTotalSeconds(CAPTIONS)).to.equal(139);
    });

    it('tests seconds to interval', () => {
        expect(secondsToInterval(10)).to.equal(5);
        expect(secondsToInterval(300)).to.equal(60);
        expect(secondsToInterval(10 * 60)).to.equal(60);
        expect(secondsToInterval(30 * 60)).to.equal(300);
        expect(secondsToInterval(90 * 60)).to.equal(300);
        expect(secondsToInterval(120 * 60)).to.equal(300);
    });
})
