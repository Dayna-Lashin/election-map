// factory function to make candidates
var makePolitician = function(name, color)
{
	var politician = {}; // politician object

	politician.name = name; // candidate name
	politician.color = color; // state color on map
	politician.electionResults = null; // state count
	politician.totalVotes = 0; // total count

	// method to tally up totalVotes
	politician.tallyVotes = function ()
	{
		this.totalVotes = 0;

		for (var i = 0; i < this.electionResults.length; i++)
		{
			this.totalVotes = this.totalVotes + this.electionResults[i];
		}

	};
	return politician;
};

var jane = makePolitician("Jane Doe", [132, 17, 11]); // first candidate
var john = makePolitician("John Doe", [245, 141, 136]); // second candidate


// election results by candidate
jane.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

john.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

// updates to original election results
jane.electionResults[9] = 1;
john.electionResults[9] = 28;

jane.electionResults[4] = 20;
john.electionResults[4] = 35;

jane.electionResults[43] = 11;
john.electionResults[43] = 27;


// call function to get overall totals for each candidate
jane.tallyVotes();
john.tallyVotes();


// state results
var winner = "";

var setStateResults = function(state)
{
	// compares state votes and picks winner
	theStates[state].winner = null;

	if (jane.electionResults[state] > john.electionResults[state])
		{
			theStates[state].winner = jane;
		}
	else if (jane.electionResults[state] < john.electionResults[state])
		{
			theStates[state].winner = john;
		}

  // changes color of state based on the winner above
	var stateWinner = theStates[state].winner;

	if (stateWinner !== null)
		{
			theStates[state].rgbColor = stateWinner.color;
		}
	else
		{
			theStates[state].rgbColor = [11,32,57];
		}

  // populating dynamic state table at bottom right of page
	var stateInfoTable = document.getElementById('stateResults'); // getting at the table in html
	var header = stateInfoTable.children[0].children[0]; // header notation each cell needs
	var body = stateInfoTable.children[1] // body notation each cell needs

	var stateName = header.children[0]; // state name - row 1 col 1
	var stateAbbrev = header.children[1]; // state abbrev - row 1 col 2
	var candidateName1 = body.children[0].children[0]; // first candidate name - row 2 col 1
	var stateResults1 = body.children[0].children[1]; // first candidate result - row 2 col 2
	var candidateName2 = body.children[1].children[0]; // second candidate name - row 3 col 1
	var stateResults2 = body.children[1].children[1]; // second candidate result - row 3 col 2
	var stateWinnerName = body.children[2].children[1]; // name of candidate who won state

  // Changes the data in the rows as states change
	stateName.innerText = theStates[state].nameFull;
	stateAbbrev.innerText = "(" + theStates[state].nameAbbrev + ")";
	candidateName1.innerText = jane.name;
	stateResults1.innerText = jane.electionResults[state];
	candidateName2.innerText = john.name;
	stateResults2.innerText = john.electionResults[state];

	// accounting for a tie
	if (theStates[state].winner === null)
		{
			stateWinnerName.innerText = "DRAW";
		}
	else
		{
			stateWinnerName.innerText = theStates[state].winner.name;
		}
};


// Picking the overall winner
if (jane.totalVotes > john.totalVotes)
{
	Overallwinner = jane;
}
else if (jane.totalVotes < john.totalVotes)
{
	Overallwinner = john;
}
else
{
		Overallwinner = "Draw";
}


// populating overall winner table at top of page
var countryInfoTable = document.getElementById('countryResults'); // getting at the table in html
var row = countryInfoTable.children[0].children[0]; // <tbody> and <tr> elements that all cells need in table

row.children[0].innerText = jane.name; // name 1
row.children[1].innerText = jane.totalVotes; // result 1
row.children[2].innerText = john.name; // name 2
row.children[3].innerText = john.totalVotes; // result 2
//skip [4] - not changing the text
row.children[5].innerText = Overallwinner.name; // overall winner
