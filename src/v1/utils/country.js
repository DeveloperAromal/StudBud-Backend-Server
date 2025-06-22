// import country from "../country.json" assert { type: "json" };

const country = await import("../country.json", {assert: {type: "json"}})

export default country.data;
