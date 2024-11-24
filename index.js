import express from "express";
import bodyParser from "body-parser";
import multer from "multer"; //used for getting form-data to be able to upload files/media
import lodash from "lodash";
import ejs from "ejs";
// import path from "path";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true })); //inorder to parse the body into strings and understandable form

// use multer to handle image/file uploads
const upload = multer({ dest: "public/uploads" });

// declaring blogposts array where every post will be stored
const blogPosts = [];

const featPosts = {
  posts: [
    {
      title: "Be part of a better internet",
      content:
        "This is an ode to paying to get what you want, an explanation of how Medium’s membership makes a uniquely better home on the internet, and a call to join Medium as a member. Membership is 20% off during our summer membership campaign.The internet is broken and getting worse. It’s flooded with ads, spam, misinformation, disinformation, division, and hate.But it doesn’t have to be that way. There is a healthy way to talk to each other that inspires, informs, empowers, and brings people together.At Medium, we say our purpose is to “deepen your understanding of the world.”That’s why this moment on the internet feels even more urgent than normal. Even before Google used AI to tell us to put more glue on our pizza (really!), search results were already flooded with content that was written by or for machines, not humans.It costs money to run a website, so publishers and platforms tried to pay for their business with ads.It’s easy to name a root cause — ads reward any content that can grab your attention long enough to show you yet another ad, and the more the better.Now we have decades of proof that attention-grabbing isn’t the same as good. Instead of the information superhighway that we were promised, ads gave us an internet where almost all incentives are to create cheap, high-volume, low-quality content designed to get as many eyeballs as possible.If we want to build a better internet, we have to build different types of incentive models. That’s what we’re doing at Medium.Everything Medium does is paid for by our members, not advertising. We’re not trying to manipulate your attention to show you more ads. Instead, we care about a much harder challenge: How can we show you a story that you will be happy to have paid to read?We’re biased, but we believe more places on the internet should be directly funded by their users. That results in honest incentives for those platforms to simply give as much value as possible to their community (you), so the community sticks around and keeps paying.And since Medium is free to use, this value extends beyond the Medium member community. Those who can afford to pay for a Medium membership are creating a better internet for everyone.Think about the current state of the internet. Now, imagine how much it improves when you get the incentives right.Imagine a place that:Respects your time, free from ads and spamRecommends the most informed writers, not the loudestProtects you from a deluge of spam, fraud, and AI-generated content Promotes deeper understanding, not misunderstanding or division Rewards writers to do even more of the hard work of researching and articulating their ideas and knowledge. Medium is one of those places. Here’s how our members are helping us build it. #1. We are building a place that respects your time, free from ads We already know that ads cause a broken business model with misaligned incentives. Publishers get paid for your attention, rather than the value they provide, so they want to publish clickbait, doombait, rage bait, all the baits — all to show you more ads. Readers, meanwhile, just want to read a good story. We realigned incentives by removing ads. You want to read something good and interesting, and because you’re paying for it, we want that for you, too. At Medium, we don’t show ads at all. As a result, Medium lets you focus on the story. #2. We are building a place that recommends the best writers, not the loudest ones Platforms have tried to replace authority with attention-based algorithms on the flawed theory that if it’s popular, it must be good. This has failed spectacularly to deepen our understanding of anything. On Medium, we’ve often found that the most informed writers rarely have the time, or desire, to learn to play attention-grabbing games that other algorithms reward. So we focus on creating a platform where they don’t need to master SEO or build audiences. These skills shouldn’t be a requirement for being heard. The voices who get pushed off the internet right now are very often the ones most worth reading. Our curation system uses subject-matter experts to spot the good stuff for you. #3. We protect you from a deluge of spam, fraud, and AI-generated content You’ve probably seen how bad AI-generated content can be. But you might not realize how much AI has lowered the price of creating spam. Last year, Medium deleted and removed one million spam posts from your feeds every month. Last month we removed nearly ten million. That’s a deluge of digitally-assembled nonsense that is hitting every part of the internet. (On other platforms, spam can sometimes masquerade as yet another way to grab your attention long enough to show you an ad.) For the most part, readers on Medium don’t see this spam wave because it’s filtered out by our engineers, our trust and safety team, our curators, and our community publication editors. That’s a lot of work. We do more of it than other platforms simply because our members demand it. #4. We promote deeper understanding, not misunderstanding or divisionCurators on Medium focus on a set of quality guidelines to find writing that actually deepens your understanding. There are a lot of ways for a writer to have the credibility we’re looking for, but mainly a writer earns it through deep thought, research, professional experience, and/or personal experience. Your experience on Medium is improved by two processes here. First, we find the stories that reach this high bar and show them to you. Second, we work hard to push lazy hateful hot takes and intentionally divisive trolling completely off the site. The internet is vast and there are other places for trolls to troll. Our preference for deeper, more compelling writing means that these guidelines are anti-partisan. Information doesn’t get better just because it has fans inside one political party. The best way to learn, and to find common ground, is to have a high bar for discussion. Anyone, regardless of political party, can come to Medium to deepen their understanding of the world. #5. We reward writers to do the hard work of researching and articulating their ideas and knowledge Writing is hard no matter what. But great writing requires more hard work: more research, more feedback, more revisions, more effort. One of the hallmarks of the attention economy is that platforms incentivize content creators to make content as quickly as possible. That’s why we see so many writers outsource, copy, and use thinly-veiled plagiarism. Now they turn to AI generators, too. But knowledge isn’t just content, and stories don’t resonate without a human voice behind them. We communicate with each other through stories because that’s the most effective way to learn and retai knowledge. To write those stories well takes time. Medium rewards writers who put in extra work. As a result, readers enjoy a platform full of thoughtful, well-written human stories and ideas. Look, we know Medium didn’t invent the paywall. You’ve seen them in other places that care about deepening your understanding. But we are doing something unique and innovative. We are the only user-generated content platform that uses subscription incentives and opens those incentives up to writers. We’re proving that it changes which writers and stories succeed. I don’t have any illusion that Medium will replace the internet. But I do think a healthier internet requires places like Medium — places that are building systems that help people spend their time and money in thoughtful ways — to exist. If you’re like us, if you’re curious, if you’re hungry to deepen your understanding of your world, if you think we can do better than the current standard of how the internet works, then now is an important time to invest in yourself and us.",
      author: "Tony Stubblebine",
      image: "static/images/featPost1.webp",
      postTime: "Today",
    },
    {
      title: "The farmer, his son and their dog",
      content:
        "In the winter of 1994, a farmer’s son was home from his boarding school for the holidays. He wanted a pup – a German Shepherd to be precise– exactly like the one his cousins in Lahore had been boasting about the whole autumn.  But his village was not Lahore, nor were his parents as liberal as his uncle and family. Although General Ziaul Haq’s plane had crashed a few years ago, the renaissance of orthodox Islam in Pakistan, at least in the villages of Punjab, did not vanish with him. “A pup?” the farmer looked at his son in disbelief. He was a God-fearing, saintly man; a descendant of Sikhs but his grandfather had embraced Islam. Religion was not handed to them at birth but in fact the practice adopted out of choice. On top of that, the 1980s were the return of everyone who could be credited with spreading Islam in the sub-continent from Muhammad bin Qasim to General Ziaul Haq. A dog was a bargain against the angels – an opportunity cost that the farmer’s son would have to bear. “A household that keeps a dog, turns away the angel of good, my son,” the farmer tried to reason with his 15-year-old. “Dogs are unhallowed beings. They turn a place unholy with their presence. You will have to perform wudu (ablution) every time you touch him.” “But Baba ji we do not have to keep it in the haveli; we can keep it in the barn with the other animals. The angels could still bring blessings to our home. Also, it is a guard dog; good for protecting animals. If you could please get me one, I promise you, I will never bring it in the haveli; I will keep it in the barn.” “I will think about it. We shall discuss this when you come home for your summer holidays,” the farmer mumbled. When the boy finally did come home, parental love had triumphed over religious conservatism. Waiting in the barn was a three-month-old pup with a broad head, a sharp muzzle and a thick black and tan coat. His bushy tail curved downwards and the puppy ran to the boy as soon as he saw him, like they were old friends. The boy sat down and started patting the dog’s back fondly.“What are you going to call him?” “Simba! Baba ji; I am going to call him Simba.” “Why so?” “Baba ji, Simba is a lion cub in a movie I watched at school. His father, Mufasa, is a just and honorable king. He loves his son more than anything. Simba loves him too. When Simba grows up, he looks just like his father. It’s a very good story, Baba ji. It reminds me of us. I will call him Simba so that when I am back at school, he reminds you of me.” As the lazy summer wore on, the boy and his puppy frolicked around the canal which passed through lush green fields. Simba was a quick learner and could even find stones the boy would throw into shallow waters and thick crops of maize. They would beat the afternoon heat under the shade of sprawling trees. It was a perfect summer but it came to an end as all good things do and it was time for the boy to return to his boarding school. “Baba ji, could you please feed Simba for me till I return again in the winters? You don’t have to touch him. Anyone can unleash him in the morning and evening for a walk. He likes to run after the birds in the fields, but he will find his way back to the barn. He always does. There is nothing to worry about it,” the boy said. In October, the boy received a letter from his father. “My son, Simba seems to have lost his appetite. He is not eating much. First, I thought it was probably because of your absence. I thought he missed you. But lately, I have seen that his bowel movements have been giving him pain while there also has been some blood in his faeces. He licks at his tail excessively unlike before.” The letter further informed the boy that the farmer had taken Simba to their buffaloes veterinarian in the city but to no avail. “He did not allow Simba inside his office,” the father sadly informed his son, “I pleaded with him, but I could not convince him to examine Simba. But he prescribed some medicine anyway.” The letter urged the boy to come home over the weekend for Simba’s sake and that the principal will be informed of the sudden emergency at home. The following weekend, after sunset, Simba finally rested his head in the boy’s lap. Ironically he was in the haveli, with the farmer sitting next to him. They sat silently, caressing Simba’s head, who weakly licked both their hands in return. The farmer did not resist. It actually felt like the angel of mercy and good had abandoned the haveli, as Simba did not survive the night. It seemed like he had spent all his energy waiting for the boy to come home and was finally ready to pass on. Around dawn, the farmer dug a grave for their beloved Simba under a banyan tree on the ground of the haveli and it was there the dog remained resting, fending off or perhaps inviting in, the angel of mercy and good.",
      author: "Muhammad Shafiq Haider",
      image: "static/images/featPost2.jpg",
      postTime: "Yesterday",
    },
    {
      title: "Defamation Bill: A tool for justice or a muzzle on free speech?",
      content:
        "The Defamation Bill 2024, intended to protect individuals and institutions from false and damaging statements, has ignited a fierce debate about its implications for justice, freedom of expression, and democracy. While the bill ostensibly aims to safeguard reputations against malicious attacks, it raises significant concerns about its potential to stifle free speech, intimidate journalists, and suppress dissent. This legislation, in its current form, seems more a cudgel against critics than a shield for the defamed.Supporters of the Defamation Bill argue that it is a necessary tool to protect individuals and organisations from baseless accusations that can irreparably damage reputations and livelihoods. They contend that in an era of rampant misinformation and social media cruelty, stringent defamation laws are essential. Proponents highlight cases where false allegations have ruined careers and personal lives, arguing that the bill provides a legal recourse for the aggrieved. For instance, public figures, often targets of unfounded rumors and character assassinations, could find solace in this legislation, which ostensibly offers them a means to clear their names and seek redress.However, the flip side of the argument presents a more alarming picture. Critics argue that the Defamation Bill poses a grave threat to free speech and press freedom in Pakistan, a country already struggling with issues of censorship and media suppression. The bill's vague definitions and broad provisions could be exploited to silence legitimate criticism and investigative journalism. In a society where corruption and abuse of power are rampant, the role of a free press is indispensable. Yet, this legislation could intimidate journalists, activists, and ordinary citizens, deterring them from speaking out against wrongdoing for fear of legal retribution.Pakistan ranks 157th out of 180 countries on the World Press Freedom Index, reflecting the precarious state of media freedom. The Defamation Bill could worsen this situation, making it even more difficult for journalists to perform their crucial watchdog role. Instances of journalists being harassed, threatened, or detained for reporting on sensitive issues are already too common. The bill could provide yet another tool for the powerful to quash dissent and evade scrutiny, effectively muzzling the press.Another critical concern is the legal ambiguity surrounding the bill's provisions. The vague terminology and subjective criteria for what constitutes as defamation can lead to arbitrary and inconsistent application. This lack of clarity opens the door for misuse by those in power. Politicians, bureaucrats, and influential figures could weaponise the law to target opponents and critics selectively. The potential for such abuse is not hypothetical but a real and pressing issue, given Pakistan's history of politically motivated legal actions.Looking at international standards, many democratic countries have moved towards decriminalising defamation, recognising that criminal penalties for speech can have a chilling effect on free expression. Countries like the United States and the United Kingdom have protections for speech, emphasising the importance of a free and open dialogue in a democratic society. Pakistan's move towards harsher defamation laws appears regressive in this context, aligning more closely with authoritarian regimes that use such laws to suppress dissent.The challenge lies in striking a balance between protecting reputations and upholding the fundamental right to free speech. Defamation laws are not inherently problematic; they serve an important purpose in maintaining social order and personal dignity. However, the implementation and scope of such laws must be carefully calibrated to prevent abuse. Safeguards must be put in place to ensure that defamation claims are not used as tools of harassment or intimidation.The Defamation Bill is a deeply flawed piece of legislation that risks becoming a tool for oppression rather than protection. While it is crucial to shield individuals from malicious falsehoods, this must not come at the expense of free speech and democratic discourse. The bill, as it stands, is a threat to the core values of democracy and justice. It needs to be fundamentally revised to ensure it cannot be misused to suppress legitimate criticism and investigative journalism. Pakistan must prioritise free speech and press freedom, understanding that these are the cornerstones of a vibrant and healthy democracy. Without these protections, the country risks sliding further into authoritarianism, where dissent is silenced, and power remains unchecked.",
      author: "Syeda Alizeh Ahmed ",
      image: "static/images/featPost3.jpg",
      postTime: "2 weeks ago",
    },
    {
      title: "PSX hits new high as KSE-100 index breaches 94,000 barrier",
      content:
        "During intra-day trading, the index surged by 526 points or 0.59% at 11 am, briefly crossing the 94,000-point level. The market closed at 93,648.32 points after hitting the record high of 94,020.02 mark during the intra-day trading with a recorded increase of 356.64 points seeing a 0.38% rise.In an outstanding rally during the outgoing week, the bulls posted significant gains of over 2,400 points, driven predominantly by the State Bank of Pakistan's (SBP) decision to lower its policy rate by 2.5 percentage points. The rate cut was interpreted by market analysts as a positive signal for liquidity and economic stability, lifting investor confidence. In addition, the government's Sukuk auction raised a significant amount, with yields across all tenors contracting, which underscored continued investor appetite for government-backed securities.On the economic front, workers' remittances grew to $3.1 billion while the SBP's foreign exchange reserves rose $18 million to $11.17 billion. In a historic rally on Friday, stocks soared past the 93,000 mark for the first time ever, taking cue from rising global equities and falling local lending rates.The benchmark KSE-100 index closed at 93,292, marking a robust increase of 2,432 points, or 2.7% week-on-week (WoW). JS Global Deputy Head of Research Muhammad Waqas Ghani, in his review, wrote that the stock market remained bullish during the outgoing week, closing at 93,292, an increase of 2.7% WoW. Average volumes increased 31% to 735 million shares.points from the peak of 22%, he said. The market got a boost when eight Pakistani companies were added to the MSCI Frontier Markets Small Cap Index, a move that was expected to attract global investors and accelerate foreign fund inflows.As per the Federal Board of Revenue (FBR) data, income tax collection faced a shortfall during 4MFY25. In other news, the government was preparing to finalise its strategy for talks with the International Monetary Fund (IMF) staff mission from November 11 to 15.Moreover, Prime Minister Shehbaz Sharif sent a special delegation to Saudi Arabia to finalise $2.8 billion worth of agreements signed recently by the two countries. According to the SBP data, remittances for October 2024 reached $3.05 billion, marking a 24% increase compared to the same period of last year, the JS deputy research head added.AHL Research, in its report, said that throughout the week the market showcased a stellar performance, taking the KSE-100 index to an all-time high of 93,292 points. The robust momentum was driven by the SBP's historic 250-basis-point cut in policy rate. In the quarterly MSCI review, Pakistan's weight in the MSCI Frontier Markets Index rose to 4.4%, making it the second most liquid market The government raised Rs339 billion through Ijarah Sukuk, with yields declining 43 to 104 basis points. During the week, Pakistani rupee remained stable and closed at Rs277.95 against the US dollar.  Sector-wise, positive contributors were fertiliser (505 points), cement (404 points), power generation and distribution (376 points), oil and gas exploration companies (320 points) and automobile assemblers (288 points). Foreign selling was witnessed during the week under review, which amounted to $4.65 million compared to net buying of $1.97 million last week.",
      author: "News Desk",
      image: "static/images/featPost4.png",
      postTime: "1 week ago",
    },
  ],
};

// Get the directory name from the module URL
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// console.log(__dirname);
// Declaring date for dynamically updating time

const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });

// app.set("views", path.join(__dirname, "/views"));
// app.set("view engine", "ejs");
// app.engine("ejs", ejs.__express);

// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  //  navigate to home.ejs

  res.render("home.ejs", { posts: blogPosts, date: today, featPosts: featPosts });
});

app.get("/editPost", (req, res) => {
  //it will redirect to Edit post section of the website once the edit post button is clicked

  const postIndex = req.query.id; // Get the post index from the query string (key:value pair)

  const post = blogPosts[postIndex]; // Get the specific post using the index

  if (post) {
    res.render("editPost.ejs", { post, postIndex }); // Pass the post data and index to the edit page
  }
});

app.get("/about", (req, res) => {
  //redirect to about section of the website
  res.render("about.ejs");
});

app.get("/", (req, res) => {
  //pass blogPosts array into posts properties so now posts=blogPosts[], so its an array now
  res.render("home.ejs", { posts: blogPosts, date: today, featPosts: featPosts });
});

app.get("/myPosts", (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  res.render("myPosts.ejs", { blogPosts: blogPosts, date: today, year: year });
});

app.post("/publish", upload.single("image"), (req, res) => {
  //it will take form data from the user using for (i.e their blog post info) once the publish button is clicked
  const data = req.body; // Access text data
  const file = req.file; // Access the uploaded file

  const blogPost = {
    title: data.title,
    content: data.content,
    author: data.author,
  };
  if (file) {
    // If an image is uploaded, add the image data
    blogPost.image = {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  blogPosts.push(blogPost);
  // console.log("File info:", file);

  res.redirect("/home");
});

// DELETE route to handle deleting a blog post

app.post("/delete-post", (req, res) => {
  const postIndex = req.body.postIndex; // Get the index of the post to delete
  blogPosts.splice(postIndex, 1); // Remove the post from the array
  res.redirect("/myPosts"); // Redirect back to the myposts page
});

// UPDATE route to handle editing a blog post
app.post("/edit-post", upload.single("image"), (req, res) => {
  const postIndex = req.body.postIndex;
  const data = req.body;
  const file = req.file;

  // Update the post data
  blogPosts[postIndex].title = data.title;
  blogPosts[postIndex].content = data.content;
  blogPosts[postIndex].author = data.author;

  if (file) {
    // If a new image is uploaded, update the image
    blogPosts[postIndex].image = {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  res.redirect("/home"); // Redirect back to the home page
});

app.get("/posts/:postTitle", (req, res) => {
  const requestedTitle = lodash.lowerCase(req.params.postTitle);

  featPosts.posts.forEach(function (post) {
    const featPostTitle = lodash.lowerCase(post.title);
    if (requestedTitle === featPostTitle) {
      res.render("post.ejs", { title: post.title, content: post.content });
    }
  });
  blogPosts.forEach(function (post) {
    const blogPostTitle = lodash.lowerCase(post.title);

    if (requestedTitle === blogPostTitle) {
      res.render("post.ejs", { title: post.title, content: post.content });
    }
  });
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

// export default app; // Required by Vercel

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
