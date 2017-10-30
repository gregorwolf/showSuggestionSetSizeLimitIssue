sap.ui.define([
	"sap/ui/core/mvc/Controller",'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.computerservice-wolf.test.showSuggestionSetSizeLimitIssue.controller.V", {
		onInit: function(oEvent) {

			var oModel = new JSONModel(jQuery.sap.getModulePath(
				"com.computerservice-wolf.test.showSuggestionSetSizeLimitIssue.model", 
				"/products.json"));
			oModel.attachRequestCompleted(oEvent, this.productModelLoaded, this);
			this.getView().setModel(oModel);

			this.byId("productInput").setFilterFunction(function(sTerm, oItem) {
				// A case-insensitive 'string contains' style filter
				return oItem.getText().match(new RegExp(sTerm, "i"));
			});

			var oModelProducts = new JSONModel(jQuery.sap.getModulePath(
				"com.computerservice-wolf.test.showSuggestionSetSizeLimitIssue.model", 
				"/products.json"));
			oModelProducts.setSizeLimit(300);
			this.getView().setModel(oModelProducts, "Products");

			this.byId("product2Input").setFilterFunction(function(sTerm, oItem) {
				// A case-insensitive 'string contains' style filter
				return oItem.getText().match(new RegExp(sTerm, "i"));
			});
		},
		productModelLoaded: function(oEvent) {
			var oModel = this.getView().getModel();
			var size = oModel.getProperty("/ProductCollection/length");
			oModel.setSizeLimit(size);
		}
	});
});