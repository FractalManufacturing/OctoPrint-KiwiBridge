$(function() {
    function KiwiBridgeViewModel(parameters) {
        var self = this;

        self.settings = parameters[0];
        self.status = ko.observable("offline");

        self.pluginName = "kiwibridge";

        self.connectToFractal = function () {
            var url = window.PLUGIN_BASEURL + self.pluginName + '/connect'
            $.post( url, { token: $("#token").val() } );
        };

        self.disconnectFromFractal = function () {
            var url = window.PLUGIN_BASEURL + self.pluginName + '/disconnect'
            $.get( url );
        };

        self.getConnectionStatus = function () {
            var url = window.PLUGIN_BASEURL + self.pluginName + '/status'
            $.get( url , function( data ) {
                if (data.connected) {
                    self.status("online")
                } else {
                    self.status("offline")
                }
            }, "json");
        };

        self.resetDB = function () {
            var token = $("#token").val();
            alert(token);
        };

        self.onBeforeBinding = function () {
            self.getConnectionStatus();
        }

        self.onDataUpdaterPluginMessage = function(plugin, data) {
            if (plugin != "kiwibridge") {
                return;
            }
            if (data.connected) {
                self.status("online")
            } else {
                self.status("offline")
            }
        }
    }

    OCTOPRINT_VIEWMODELS.push([
        KiwiBridgeViewModel,
        ["settingsViewModel"],
        ["#settings_plugin_kiwibridge"]
    ]);
});
