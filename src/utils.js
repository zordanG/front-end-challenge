export function arrangeProcesses(processes) {
    let listLength = 0;
    let processesList = [];

    processes.map((process) => {
        processesList = [...processesList, process.name + ', '];
    })
    
    listLength = processesList.length - 1;
    processesList[listLength] = processesList[listLength].replace(", ", " ");
    return processesList;
}