app.directive('countDown', function($interval) {
	return function link(scope, element, attrs) {	
		function update() {
			var secondsRemaining = scope.card.secondsTillSpawn;
 
			if (secondsRemaining >= 3600) {
				scope.card.hrs = Math.floor(secondsRemaining / 3600) + ' hr ';
				secondsRemaining = secondsRemaining % 3600;
			}
			else {
				scope.card.hrs = '';
			}
			
			if (secondsRemaining >= 60) {
				scope.card.mins = Math.floor(secondsRemaining / 60) +' min ';
				secondsRemaining = secondsRemaining % 60;
			}	
			else {
				scope.card.mins = '';
			}

			if (secondsRemaining > 0) {
				scope.card.secs = secondsRemaining + ' sec';
			}
			else if (scope.card.secondsTillSpawn === 0) {
				scope.card.secs = '';
				var d = new Date();
				if (scope.card.hasvariance) {
					scope.card.msg = 'Variance since ' + d.toLocaleTimeString();
				}
				else {
					scope.card.msg = 'Spawned at ' + d.toLocaleTimeString();
				}
			}

			scope.card.secondsTillSpawn--;
		}

		element.on('$destroy', function() {
			$interval.cancel(timeout);
		});

		var timeout = function() {
			if (scope.card.secondsTillSpawn >= 0) {
				update();
			}
		};

		timeout();
		$interval(timeout, 1000);

		scope.$watch(function () { return scope.card.secondsTillSpawn; }, function(value) {
			if (scope.card.secondsTillSpawn === scope.card.spawntime * 60) {
				scope.card.hrs = '';
				scope.card.mins = '';
				scope.card.secs = '';
				timeout();
			}
		});
	};
});