function send(msg) {
	console.log(msg);
}

model = {
	buttons: [],
}

view = {
	render: function() {
		listButtons = controller.getButtons();

		for (var i = 0; i < listButtons.length; i++) {
			if (listButtons[i].className == "btn opr") 
				document.getElementById("opr").append(listButtons[i]);
			else
				document.getElementById("button-grid").append(listButtons[i]);
		}
	},

	renderAnswer: function(str) {
		output = document.getElementById("output");
		output.value = "";
		output.placeholder = str;
	}
}

controller = {
	init: function() {
		send("trial");
		this.generateButtons();
		view.render();
	},

	createButton: function(text, val, type) {
		send("Button create");

		var button = document.createElement("button");
		button.setAttribute("value", val);
		button.textContent = text;
		button.className = "btn";
		if (type === "opr") 
			button.className += " opr";
		
		button.onclick = function() {
			document.getElementById("output").value += this.value;
		}	

		return button;

	},

	generateButtons: function() {
		send("Buttons generating");

		for( var i = 0; i < 10; i++) {
			button = this.createButton(i, i);
			model.buttons.unshift(button);	
		}

		button = this.createButton("/", "/", "opr");
		model.buttons.push(button);
		button = this.createButton("*", "*", "opr");
		model.buttons.push(button);
		button = this.createButton("+", "+", "opr");
		model.buttons.push(button);
		button = this.createButton("-", "-", "opr");
		model.buttons.push(button);
		button = this.createButton("=", "=", "opr");
		button.id = "evaluate";
		button.onclick = function() {
			controller.evaluate(document.getElementById("output").value);
		}

		model.buttons.push(button);
	},

	getButtons: function() {
		return model.buttons;
	},

	evaluate: function(str) {
		view.renderAnswer(eval(str));
	}
}

controller.init();