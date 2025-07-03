(function (wp) {
	const { registerBlockType } = wp.blocks;

	// Pobierz nazwę bloku z nazwy pliku
	const scriptPath = document.currentScript.src;
	const blockName = scriptPath.split('/').slice(-2)[0];
	const blockDataKey = 'weblegendBlockData_' + blockName.replace(/-/g, '_');

	// Pobierz dane specyficzne dla tego bloku
	const blockData = window[blockDataKey];
	if (!blockData || Object.keys(blockData).length === 0) {
        // console.warn(`Block data for ${blockName} is missing or empty.`);
        return;
    }

	// Funkcja do ładowania JSON
	async function loadJSON(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	}

	// Ładowanie wszystkich potrzebnych zasobów
	Promise.all([
		loadJSON(blockData.blockDir + 'block.json'),
		import(blockData.blockDir + 'edit.js'),
		import(blockData.blockDir + 'save.js'),
	])
		.then(([metadata, { default: Edit }, { default: save }]) => {
			registerBlockType(metadata.name, {
				...metadata,
				edit: Edit,
				save,
			});
		})
		.catch((error) => console.error('Error loading block:', error));
})(window.wp);
