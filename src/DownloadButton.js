import "./DownloadButton.css"

function DownloadButton({getData, available}) {
    const data = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Alice', age: 25, city: 'Los Angeles' },
        { name: 'Bob', age: 35, city: 'Chicago' },
    ];

    const convertToCSV = (data) => {
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        return [header, ...rows].join('\n');
    };

    const downloadCSV = () => {

        if (available) {
            const data = getData();
            if (data.length !== 0) {
                const csvData = convertToCSV(getData());
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.csv';
                a.click();
                window.URL.revokeObjectURL(url);
            }
            else {
                alert("No cards ?")
            }
        }

    };

    return (
        <button onClick={downloadCSV} className={available ? "available" : ""}>Download CSV</button>
    );
}

export default DownloadButton;





