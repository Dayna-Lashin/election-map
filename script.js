var winner = "???";

var makePolitician = function(name, color)
{
	var politician = {};

	politician.name = name;
	politician.color = color;
	politician.electionResults = null;
	politician.totalVotes = 0;

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

var jane = makePolitician("Jane Doe", [132, 17, 11]);
var john = makePolitician("John Doe", [245, 141, 136]);


jane.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

john.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

jane.electionResults[9] = 1;
john.electionResults[9] = 28;

jane.electionResults[4] = 20;
john.electionResults[4] = 35;

jane.electionResults[43] = 11;
john.electionResults[43] = 27;

jane.tallyVotes();
john.tallyVotes();

var setStateResults = function(state)
{
	theStates[state].winner = null;

	if (jane.electionResults[state] > john.electionResults[state])
		{
			theStates[state].winner = jane;
		}
	else if (jane.electionResults[state] < john.electionResults[state])
		{
			theStates[state].winner = john;
		}

	var stateWinner = theStates[state].winner;

	if (stateWinner !== null)
		{
			theStates[state].rgbColor = stateWinner.color;
		}
	else
		{
			theStates[state].rgbColor = [11,32,57];
		}

	var stateInfoTable = document.getElementById('stateResults');
	var header = stateInfoTable.children[0].children[0];
	var body = stateInfoTable.children[1]

	var stateName = header.children[0];
	var stateAbbrev = header.children[1];
	var candidateName1 = body.children[0].children[0];
	var stateResults1 = body.children[0].children[1];
	var candidateName2 = body.children[1].children[0];
	var stateResults2 = body.children[1].children[1];
	var stateWinnerName = body.children[2].children[1];

	stateName.innerText = theStates[state].nameFull;
	stateAbbrev.innerText = "(" + theStates[state].nameAbbrev + ")";
	candidateName1.innerText = jane.name;
	stateResults1.innerText = jane.electionResults[state];
	candidateName2.innerText = john.name;
	stateResults2.innerText = john.electionResults[state];

	if (theStates[state].winner === null)
		{
			stateWinnerName.innerText = "DRAW";
		}
	else
		{
			stateWinnerName.innerText = theStates[state].winner.name;
		}
};

//console.log("Jane got " + jane.totalVotes + " total votes.");
//console.log("John got " + john.totalVotes + " total votes.");

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

var countryInfoTable = document.getElementById('countryResults');
var row = countryInfoTable.children[0].children[0];

row.children[0].innerText = jane.name;
row.children[1].innerText = jane.totalVotes;
row.children[2].innerText = john.name;
row.children[3].innerText = john.totalVotes;
row.children[5].innerText = Overallwinner.name;
