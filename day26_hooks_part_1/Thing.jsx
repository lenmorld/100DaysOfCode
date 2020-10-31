import React, { useState, useEffect } from 'react'


export default function ({ text }) {
	const [name, setName] = useState(text)

	return <div>Thing {name}</div>
}