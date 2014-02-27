module.exports = function( grunt ) {
    grunt.registerTask( 'default', [ 'newer:jshint', 'concurrent:newer' ] );
    grunt.registerTask( 'dist',    [ 'jshint', 'concurrent:dist' ] );
}
