import unirand from 'unirand'
class Video {
    constructor(length,type,playRate) {
        this.length = length;
        this.type= type;
        this.playRate = playRate;
        if(type==='short'){
            this.chunkList=[0,1,2]
        }
        if(type==='long'){
            for(let i=0;i<length/5;i++){
                this.chunkList.push(i)
            }
        }
    }
}

//Zipf-like distribution
const totalVideos = 100; // Total number of videos
const topVideosPercentage = 0.2; // Top 10% of videos
const topVideosCount = Math.ceil(totalVideos * topVideosPercentage); // Number of top videos

const exponent = 1.5; // Adjust this value for the desired skewness of the Zipf distribution

// Generate the probabilities for each video using Zipf distribution
const probabilities = Array.from({ length: totalVideos }, (_, i) => 1 / Math.pow(i + 1, exponent));

// Calculate the sum of probabilities of the top videos
const topVideosProbSum = probabilities.slice(0, topVideosCount).reduce((sum, prob) => sum + prob, 0);

// Scale the probabilities for the top videos to make 80% of the traffic
const scalingFactor = 0.8 / topVideosProbSum;
const scaledProbabilities = probabilities.map((prob, index) => (index < topVideosCount ? prob * scalingFactor : 0));

const totalTraffic = 1000; // Total traffic count
const videoTraffic = scaledProbabilities.map((prob) => Math.round(prob * totalTraffic));

// Print the simulated video traffic for each video
console.log('Video Traffic:', videoTraffic);

// Print the probabilities for each video
console.log('Video Probabilities:', scaledProbabilities);


// const playRateDistribution = [1,0.33,0.25]  // Play rate distribution for short video
const playRateDistribution = [1.0,0.8,0.7,0.65,0.6,0.55,0.5,0.45,0.4,0.35,0.3,0.28,0.26,0.24,0.22,0.21,0.20]  // Play rate distribution for long video
let videos=[]
for(let i=0;i<totalVideos;i++){
    for(let j=0;j<playRateDistribution.length;j++){

        videos.push([scaledProbabilities[i]*playRateDistribution[j],i,j])
    }
}

videos=videos.sort((a,b)=>b[0]-a[0])

console.log('Video List:', videos.slice(0,15));
