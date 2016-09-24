/* Generate Test Data for bpn2xy */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0[3][3];
  double _t0[3][3];
  unsigned long long modulo = 0;
  printf("var bpn2xy_results = [\n");
  for (_t0[0][0] = 0; _t0[0][0] <= 1; _t0[0][0] += 1) {
  for (_t0[0][1] = 0; _t0[0][1] <= 1; _t0[0][1] += 1) {
  for (_t0[0][2] = 0; _t0[0][2] <= 1; _t0[0][2] += 1) {
  for (_t0[1][0] = 0; _t0[1][0] <= 1; _t0[1][0] += 1) {
  for (_t0[1][1] = 0; _t0[1][1] <= 1; _t0[1][1] += 1) {
  for (_t0[1][2] = 0; _t0[1][2] <= 1; _t0[1][2] += 1) {
  for (_t0[2][0] = 0; _t0[2][0] <= 1; _t0[2][0] += 1) {
  for (_t0[2][1] = 0; _t0[2][1] <= 1; _t0[2][1] += 1) {
  for (_t0[2][2] = 0; _t0[2][2] <= 1; _t0[2][2] += 1) {

    double res0 = {0};
    double res1 = {0};
    modulo = modulo > 5
      ? 0 : modulo + 1;
    if (modulo != 1) continue;
    memcpy(&t0, &_t0, sizeof t0);
    printf("  [");
    exportMAT33(t0);
    printf(", ");
    iauBpn2xy(t0, &res0, &res1);
    printf("%.28e", res0);
    printf(", ");
    printf("%.28e", res1);
    printf("  ],\n");

  }
  }
  }
  }
  }
  }
  }
  }
  }

  printf("];\n");
}
