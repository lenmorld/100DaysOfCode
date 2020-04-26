import React from "react";

const styles = {
	body: {
		margin: "1rem",
	},
	pending: {
		opacity: 0.3,
		backgroundColor: "lightgray",
	},
	ready: {
		opacity: 1,
		backgroundColor: "transparent",
	},
};

// ### REACT SUSPENSE ###
const TRANSITION_CONFIG = {
	timeoutMs: 3000, // 🐨 Play with this number a bit...
};

function fetchBlogPost(query) {
	// FAKE, just convert name to a post id
	const id = Math.round(Math.random() * 10) + 1;

	return new Promise((resolve, reject) => {
		fetch(`https://reqres.in/api/posts/${id}`)
			.then((data) => data.json())
			.then((json) => {
				// add a delay to see UI before data
				setTimeout(() => {
					resolve(
						`${json.data.id} ${query} ${json.data.name} ${json.ad.text} ${json.data.name} ${query}`.toLowerCase()
					);
				}, 3000);
			});
	});
}

// ### REACT SUSPENSE ###
function createBlogResource(name) {
	let status = "pending";
	let result;
	const suspender = fetchBlogPost(name).then(
		(post) => {
			status = "success";
			result = post;
		},
		(error) => {
			status = "error";
		}
	);

	/**
	 * return a read() function, instead of the result
	 * because the result may not be available
	 *
	 * read() will be called when it's pending,
	 * 	but again when the result is there
	 */
	return {
		read() {
			if (status === "pending") {
				throw suspender;
			}

			if (status === "success") {
				return result;
			}
		},
	};
}

// ### REACT SUSPENSE ###
function Blog({ blogResource, isPending }) {
	// blogResource null if user didn't search yet

	return (
		<p style={isPending ? styles.pending : styles.ready}>
			{blogResource ? blogResource.read() : "🔎"}
		</p>
	);

	// with `createBlogResource`, it also becomes a lot simpler handling the cases when not ready
	// I just have to check if `blogResource` is truthy and use blogResource.read()
	// 	which takes care of the logic change
	// (no need to check status === "success")

	// Also, the "Loading..." went to parent's Suspense fallback
	// but we replaced it by some fancy nice transition styles 😎😎😎

	/* NOTE: it was error-ing out when I put the 
		<React.Suspense fallback...> here

		I think it's an essential part for Suspense to "cover" the component (Blog in this case)
	*/
}

// function Blog({ blogResource }) {
// 	// blogResource null if user didn't search yet
// 	return (
// 		<div>
// 			{blogResource
// 				? blogResource.status === "success"
// 					? blogResource.data
// 					: "Loading..."
// 				: "🔎"}
// 		</div>
// 	);
// }

function App() {
	// suspense has a concept of "resources"
	const [blogResource, setBlogResource] = React.useState(null);
	// ### REACT SUSPENSE ###
	const [startTransition, isPending] = React.useTransition(TRANSITION_CONFIG);

	function handleSubmit(event) {
		event.preventDefault();
		// get value from input#nameInput
		const searchQuery = event.target.elements.searchInput.value;
		console.log("search:", searchQuery);

		// ### REACT SUSPENSE ###
		startTransition(() => {
			setBlogResource(createBlogResource(searchQuery));
		});

		// ### OLD WAY ###
		// fetchBlogPost(searchQuery)
	}

	return (
		<div style={styles.body}>
			<h1>
				Search blog!{" "}
				<span style={{ fontSize: "10px" }}>fake API courtesy of reqres.in</span>
			</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				Search: <input type="text" id="searchInput" />
				<button type="submit">Submit</button>
			</form>

			{/* <Blog blogResource={blogResource} /> */}

			<React.Suspense fallback={<div>Loading...</div>}>
				<Blog blogResource={blogResource} isPending={isPending} />
			</React.Suspense>
		</div>
	);
}

export default App;
