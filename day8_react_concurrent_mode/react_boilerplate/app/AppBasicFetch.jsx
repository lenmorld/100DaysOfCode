import React from "react";

const styles = {
	body: {
		margin: "1rem",
	},
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

function Blog({ blogResource }) {
	// blogResource null if user didn't search yet
	return (
		<div>
			{blogResource
				? blogResource.status === "success"
					? blogResource.data
					: "Loading..."
				: "🔎"}
		</div>
	);
}

function App() {
	// suspense has a concept of "resources"
	const [blogResource, setBlogResource] = React.useState(null);

	function handleSubmit(event) {
		event.preventDefault();
		// get value from input#nameInput
		let searchQuery = event.target.elements.searchInput.value;
		console.log("search:", searchQuery);

		setBlogResource({
			status: "pending", // aka fetching, loading resource, ...
		});

		fetchBlogPost(searchQuery)
			.then((post) => {
				setBlogResource({
					status: "success",
					data: post,
				});
			})
			.catch((err) => {
				setBlogResource({
					status: "error",
				});
			});
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

			<Blog blogResource={blogResource} />
		</div>
	);
}

export default App;
