// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


// Hero section - fade in from top on scroll and pin the section in place while the hero elements animate in
const heroHeadings = gsap.utils.toArray("#hero h1");
const mainScene = document.querySelector("main");
let finalPinEndY = 0;
let isFinalDownLockActive = false;
let touchStartY = 0;

const lockDownwardScrollAtFinal = (event) => {
	if (!isFinalDownLockActive) return;

	if (event.type === "wheel") {
		if (event.deltaY > 0) {
			event.preventDefault();
			window.scrollTo(0, finalPinEndY);
		}
		return;
	}

	if (event.type === "touchstart") {
		touchStartY = event.touches[0]?.clientY ?? 0;
		return;
	}

	if (event.type === "touchmove") {
		const currentY = event.touches[0]?.clientY ?? touchStartY;
		const isDownwardPageScroll = currentY < touchStartY;
		if (isDownwardPageScroll) {
			event.preventDefault();
			window.scrollTo(0, finalPinEndY);
		}
		return;
	}

	if (event.type === "keydown") {
		const blocksDownward =
			event.key === "ArrowDown" ||
			event.key === "PageDown" ||
			event.key === "End" ||
			(event.key === " " && !event.shiftKey);

		if (blocksDownward) {
			event.preventDefault();
			window.scrollTo(0, finalPinEndY);
		}
	}
};

const setFinalDownLock = (shouldLock, endY) => {
	if (typeof endY === "number") {
		finalPinEndY = endY;
	}

	if (shouldLock === isFinalDownLockActive) return;

	isFinalDownLockActive = shouldLock;

	if (isFinalDownLockActive) {
		window.addEventListener("wheel", lockDownwardScrollAtFinal, { passive: false });
		window.addEventListener("touchstart", lockDownwardScrollAtFinal, { passive: false });
		window.addEventListener("touchmove", lockDownwardScrollAtFinal, { passive: false });
		window.addEventListener("keydown", lockDownwardScrollAtFinal, { passive: false });
		return;
	}

	window.removeEventListener("wheel", lockDownwardScrollAtFinal);
	window.removeEventListener("touchstart", lockDownwardScrollAtFinal);
	window.removeEventListener("touchmove", lockDownwardScrollAtFinal);
	window.removeEventListener("keydown", lockDownwardScrollAtFinal);
};

if (heroHeadings.length && mainScene) {
	gsap.fromTo(
		heroHeadings,
		{
			y: -220,
			opacity: 0,
		},
		{
			y: 0,
			opacity: 1,
			ease: "none",
			stagger: 0.08,
			scrollTrigger: {
				trigger: mainScene,
				start: "top top",
				end: "+=500",
				scrub: true,
				pin: true,
				anticipatePin: 1,
			},
		}
	);
}

// Boss section - pin the section in place while the boss elements animate in
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -1110px",
		end: "top -1800px",
		pin: mainScene,
		anticipatePin: 1,
	});
}

// Employee scene - second pin after the boss pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -2684px",
		end: "top -3184px",
		pin: mainScene,
		pinSpacing: true,
		anticipatePin: 1,
	});
}

// Break scene - third pin after the employee pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -4030px",
		end: "top -4800px",
		pin: mainScene,
		pinSpacing: true,
		invalidateOnRefresh: true,
		anticipatePin: 1,
	});
}

// Break Ping Pong scene - fourth pin after the break pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -5746px",
		end: "top -7088px",
		pin: mainScene,
		pinSpacing: true,
		invalidateOnRefresh: true,
		anticipatePin: 1,
	});
}

// Exit Clock scene - fifth pin after the break ping pong pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -8000px",
		end: "+=500",
		pin: mainScene,
		pinSpacing: true,
		invalidateOnRefresh: true,
		anticipatePin: 1,
	});
}

// Exit scene - sixth pin after the 8000 pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -9400px",
		end: "+=500",
		pin: mainScene,
		pinSpacing: true,
		invalidateOnRefresh: true,
		anticipatePin: 1,
	});
}

// Final scene - seventh pin after the 9400 pin range
if (mainScene) {
	ScrollTrigger.create({
		trigger: document.body,
		start: "top -10900px",
		end: "+=100",
		pin: mainScene,
		pinSpacing: true,
		invalidateOnRefresh: true,
		anticipatePin: 1,
		onUpdate: (self) => {
			const atOrPastEnd = self.progress >= 1;
			setFinalDownLock(atOrPastEnd, self.end);

			if (atOrPastEnd && self.direction > 0) {
				window.scrollTo(0, self.end);
			}
		},
		onLeaveBack: (self) => {
			setFinalDownLock(false, self.end);
		},
	});
}




// Boss section - fade in from top on scroll
const bossElements = [
	"#the-boss-heading",
	"#the-boss-text",
	"#the-boss-code-snippet",
];

// Hide elements immediately so they are never visible before scrolling
bossElements.forEach((selector) => {
	const el = document.querySelector(selector);
	if (el) gsap.set(el, { opacity: 0, y: -60 });
});

// Animate in as a staggered timeline, scrubbed over 300px of scroll starting at scrollY 1110
const bossTl = gsap.timeline({
	scrollTrigger: {
		trigger: document.body,
		start: "top -1000px",
		end: "top -1110px",
		scrub: 1,
	},
});

bossElements.forEach((selector, index) => {
	bossTl.to(
		selector,
		{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
		index === 0 ? 0 : "-=0.65"
	);
});

// Boss section - animate the lamp dropping in from above, scrubbed over the same scroll range as the boss elements
const bossLamp = document.querySelector("#boss-lamp");

if (bossLamp) {
	gsap.fromTo(
		bossLamp,
		{ y: -140 },
		{
			y: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: document.body,
				start: "top -1000px",
				end: "top -1110px",
				scrub: 1,
			},
		}
	);
}

// Boss section - animate boss and computer rising together from below over the same scroll range
const boss = document.querySelector("#boss");
const bossComputer = document.querySelector("#boss-computer");

if (boss && bossComputer) {
	gsap.fromTo(
		[boss, bossComputer],
		{ y: 250 },
		{
			y: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: document.body,
				start: "top -1000px",
				end: "top -1110px",
				scrub: 1,
			},
		}
	);
}

// Boss section - animate bubble + emoji together with a pop/fade that completes at pin end + change boss skin to flush color
const bossBubble = document.querySelector("#boss-bubble");
const bossEmoji = document.querySelector("#boss-emoji");
const bossSkin = gsap.utils.toArray("#boss .skin");
const rootStyles = getComputedStyle(document.documentElement);
const skinBaseColor = rootStyles.getPropertyValue("--Skincolorprimary").trim();
const skinAccentColor = rootStyles.getPropertyValue("--Skincoloraccent").trim();
const skinFlushColor = skinBaseColor && skinAccentColor
	? gsap.utils.interpolate(skinBaseColor, skinAccentColor, 0.35)
	: skinAccentColor;

if (bossBubble && bossEmoji) {
	gsap.set([bossBubble, bossEmoji], {
		autoAlpha: 0,
		scale: 0.96,
		transformOrigin: "50% 50%",
	});

	gsap.to([bossBubble, bossEmoji], {
		autoAlpha: 1,
		scale: 1,
		ease: "power1.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -1110px",
			end: "top -1800px",
			scrub: 1,
		},
	});

	if (bossSkin.length && skinFlushColor) {
		gsap.to(bossSkin, {
			fill: skinFlushColor,
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top -1110px",
				end: "top -1800px",
				scrub: 1,
			},
		});
	}
}

// Employee section - animate lamps dropping in from above over the employee intro range
const employeeLamps = gsap.utils.toArray(".employee-lamp");

if (employeeLamps.length) {
	gsap.fromTo(
		employeeLamps,
		{ y: -140 },
		{
			y: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: document.body,
				start: "top -2600px",
				end: "top -2684px",
				scrub: 1,
			},
		}
	);
}

// Employee section - animate employee and cubicle rising in from below over the same range
const employee = document.querySelector("#employee");
const cubicle = document.querySelector("#cubicle");

if (employee && cubicle) {
	gsap.fromTo(
		[employee, cubicle],
		{ y: 300 },
		{
			y: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: document.body,
				start: "top -2600px",
				end: "top -2684px",
				scrub: 1,
			},
		}
	);
}

// Employee section - animate bubble + emoji together over the employee pin progression
const employeeBubble = document.querySelector("#employee-bubble");
const employeeEmoji = document.querySelector("#employee-emoji");

if (employeeBubble && employeeEmoji) {
	gsap.set([employeeBubble, employeeEmoji], {
		autoAlpha: 0,
		scale: 0.96,
		transformOrigin: "50% 50%",
	});

	gsap.to([employeeBubble, employeeEmoji], {
		autoAlpha: 1,
		scale: 1,
		ease: "power1.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -2684px",
			end: "top -2934px",
			scrub: 1,
		},
	});
}

// Employee section - after bubble reveal, move employee left toward the cubicle within the same pin
if (employee && cubicle) {
	gsap.to(employee, {
		x: () => -window.innerWidth * 0.32,
		ease: "none",
		scrollTrigger: {
			trigger: document.body,
			start: "top -2934px",
			end: "top -3184px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	});
}


const breakElements = [
	"#the-break-heading",
	"#the-break-text",
	"#the-break-code-snippet",
];

// Break section - animate stairs rising in from below before the break pin starts
const stairs = document.querySelector("#stairs");

if (stairs) {
	gsap.fromTo(
		stairs,
		{ y: 400 },
		{
			y: 0,
			ease: "power2.out",
			scrollTrigger: {
				trigger: document.body,
				start: "top -4008px",
				end: "top -4198px",
				scrub: 1,
			},
		}
	);
}

// Break section - animate lamps dropping in from above over the break intro range
const breakLamps = ["#break-lamp-l", "#break-lamp-r"];

gsap.fromTo(
	breakLamps,
	{ y: -260 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -5400px",
			end: "top -5746px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Break section - animate pingpong table and player rising in from below over the same range
const breakBottomElements = ["#pingpong-table", "#pingpong-player"];

gsap.fromTo(
	breakBottomElements,
	{ y: 560 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -5400px",
			end: "top -5746px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Break section - pingpong ball enters from the right and bounces down the stairs
const stairBall = document.querySelector("#pingpong-ball");

if (stairBall) {
	gsap.fromTo(
		stairBall,
		{ x: 100, y: 0 },
		{
			keyframes: [
				{ x: 56, y: -3, ease: "power1.out" },
				{ x: 20, y: 30, ease: "power1.in" },
				{ x: -12, y: 36, ease: "power1.out" },
				{ x: -60, y: 112, ease: "power1.in" },
				{ x: -92, y: 96, ease: "power1.out" },
				{ x: -146, y: 186, ease: "power1.in" },
				{ x: -178, y: 170, ease: "power1.out" },
				{ x: -220, y: 232, ease: "power1.in" },
				{ x: -246, y: 214, ease: "power1.out" },
				{ x: -274, y: 274, ease: "power1.in" },
			],
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top -4008px",
				end: "top -4880px",
				scrub: 1,
			},
		}
	);
}

// Break pingpong scene - second ball arcs in from the far left, hits table center, then bounces 3 times
const breakBall = document.querySelector("#pingpong-ball-break");

if (breakBall) {
	gsap.fromTo(
		breakBall,
		{ x: -300, y: -80 },
		{
			keyframes: [
				{ x: -300, y: -230, ease: "power1.out" },
				{ x: -210, y: -150, ease: "power1.inOut" },
				{ x: -100, y: -40, ease: "power1.in" },
				{ x: 0, y: 74, ease: "power1.in" },
				{ x: 80, y: -48, ease: "power1.out" },
				{ x: 150, y: 82, ease: "power1.in" },
				{ x: 220, y: -26, ease: "power1.out" },
				{ x: 280, y: 90, ease: "power1.in" },
				{ x: 340, y: -12, ease: "power1.out" },
				{ x: 390, y: 98, ease: "power1.in" },
				{ x: 430, y: -6, ease: "power1.out" },
				{ x: 470, y: 98, ease: "power1.in" },
				{ x: 505, y: -2, ease: "power1.out" },
				{ x: 540, y: 98, ease: "power1.in" },
				{ x: 640, y: 28, ease: "power1.out" },
				{ x: 730, y: 92, ease: "power1.out" },
				{ x: 860, y: 240, ease: "power1.inOut" },
			],
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top -5746px",
				end: "top -7088px",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		}
	);
}

// Hide elements immediately so they are never visible before scrolling
breakElements.forEach((selector) => {
	const el = document.querySelector(selector);
	if (el) gsap.set(el, { opacity: 0, y: -60 });
});

// Animate in as a staggered timeline, scrubbed over 300px of scroll starting at scrollY 1110
const breakTl = gsap.timeline({
	scrollTrigger: {
		trigger: document.body,
		start: "top -4008px",
		end: "top -4198px",
		scrub: 1,
	},
});

breakElements.forEach((selector, index) => {
	breakTl.to(
		selector,
		{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
		index === 0 ? 0 : "-=0.65"
	);
});

const clockOutElements = [
	"#clock-out-heading",
	"#clock-out-text",
	"#the-exit-code-snippet",
];

// Hide elements immediately so they are never visible before scrolling
clockOutElements.forEach((selector) => {
	const el = document.querySelector(selector);
	if (el) gsap.set(el, { opacity: 0, y: -60 });
});

// Clock-out section - staggered fade/slide from top, ending at the -8000 pin start
const clockOutTl = gsap.timeline({
	scrollTrigger: {
		trigger: document.body,
		start: "top -7600px",
		end: "top -8000px",
		scrub: 1,
	},
});

clockOutElements.forEach((selector, index) => {
	clockOutTl.to(
		selector,
		{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
		index === 0 ? 0 : "-=0.65"
	);
});

// Clock-out section - animate these lamps from top, ending at the latest pin start (-9400)
const clockOutLampsLate = ["#locker-lamp-1", "#locker-lamp-2"];

gsap.fromTo(
	clockOutLampsLate,
	{ y: -140 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -9000px",
			end: "top -9400px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Clock-out section - animate remaining lamp from top, ending at the previous pin start (-8000)
const clockOutLampsEarly = ["#lockers-lamp-1"];

gsap.fromTo(
	clockOutLampsEarly,
	{ y: -140 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -7600px",
			end: "top -8000px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Clock-out section - animate these lower objects from bottom, ending at latest pin start (-9400)
const clockOutBottomElementsLate = ["#lower-lockers", "#leaving-employee"];

gsap.fromTo(
	clockOutBottomElementsLate,
	{ y: 300 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -9000px",
			end: "top -9400px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Clock-out section - move leaving employee from right side of screen to left during latest pin
const leavingEmployee = document.querySelector("#leaving-employee");

if (leavingEmployee) {
	gsap.fromTo(
		leavingEmployee,
		{ x: () => window.innerWidth * 0.28, autoAlpha: 1 },
		{
			keyframes: [
				{ x: () => window.innerWidth * 0.04, autoAlpha: 1, ease: "none" },
				{ x: () => -window.innerWidth * 0.06, autoAlpha: 0, ease: "none" },
			],
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top -9400px",
				end: "top -9900px",
				scrub: 1,
				invalidateOnRefresh: true,
			},
		}
	);
}

// Clock-out section - animate remaining lower objects from bottom, ending at previous pin start (-8000)
const clockOutBottomElementsEarly = ["#lockers-1", "#locker-clock"];

gsap.fromTo(
	clockOutBottomElementsEarly,
	{ y: 300 },
	{
		y: 0,
		ease: "power2.out",
		scrollTrigger: {
			trigger: document.body,
			start: "top -7600px",
			end: "top -8000px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	}
);

// Clock-out section - spin clock hands around the clock center
const oddHand = document.querySelector("#odd-hand");
const hand1 = document.querySelector("#hand-1");
const hand2 = document.querySelector("#hand-2");

if (oddHand && hand1 && hand2) {
	gsap.to(oddHand, {
		rotation: "+=1080",
		ease: "none",
		svgOrigin: "669.27 4627.74",
		scrollTrigger: {
			trigger: document.body,
			start: "top -8000px",
			end: "top -8500px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	});

	gsap.to(hand1, {
		rotation: "+=240",
		ease: "none",
		svgOrigin: "669.27 4627.74",
		scrollTrigger: {
			trigger: document.body,
			start: "top -8000px",
			end: "top -8500px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	});

	gsap.to(hand2, {
		rotation: "+=60",
		ease: "none",
		svgOrigin: "669.27 4627.74",
		scrollTrigger: {
			trigger: document.body,
			start: "top -8000px",
			end: "top -8500px",
			scrub: 1,
			invalidateOnRefresh: true,
		},
	});
}