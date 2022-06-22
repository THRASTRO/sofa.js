CC       ?= gcc
CXX      ?= g++
RM       ?= rm -f
CP       ?= cp -a
CHDIR    ?= chdir
MKDIR    ?= mkdir
WINDRES  ?= windres
INSTALL  ?= install
CFLAGS   ?= -Wall
CXXFLAGS ?= -Wall
LDFLAGS  ?= -Wall
LDFLAGS  += -Wl,-undefined,error
CAT ?= $(if $(filter $(OS),Windows_NT),type,cat)

lib/%.o: ../data/src/%.c
	$(CC) -O3 -std=c99 $(CFLAGS) -isystem . -I../data/src -I. -c -o $@ $<

bin/%.exe: src/%.c
	$(CC) -O3 -std=c99 $(CFLAGS) -isystem . -I../data/src -I. lib/*.o -o $@ $<
	"$@" | perl clean-test.pl > ../test/era/$*.rslt.js

libs: lib/a2af.o      lib/c2i06a.o    lib/fae03.o     lib/ldsun.o     lib/pnm80.o     lib/seps.o       \
      lib/a2tf.o      lib/c2ibpn.o    lib/faf03.o     lib/num00a.o    lib/pom00.o     lib/sp00.o       \
      lib/ab.o        lib/c2ixy.o     lib/faju03.o    lib/num00b.o    lib/ppp.o       lib/starpm.o     \
      lib/af2a.o      lib/c2ixys.o    lib/fal03.o     lib/num06a.o    lib/ppsp.o      lib/starpv.o     \
      lib/anp.o       lib/c2s.o       lib/falp03.o    lib/numat.o     lib/pr00.o      lib/sxp.o        \
      lib/anpm.o      lib/c2t00a.o    lib/fama03.o    lib/nut00a.o    lib/prec76.o    lib/sxpv.o       \
      lib/apcg.o      lib/c2t00b.o    lib/fame03.o    lib/nut00b.o    lib/pv2p.o      lib/taitt.o      \
      lib/apcg13.o    lib/c2t06a.o    lib/fane03.o    lib/nut06a.o    lib/pv2s.o      lib/taiut1.o     \
      lib/apci.o      lib/c2tcio.o    lib/faom03.o    lib/nut80.o     lib/pvdpv.o     lib/taiutc.o     \
      lib/apci13.o    lib/c2teqx.o    lib/fapa03.o    lib/nutm80.o    lib/pvm.o       lib/tcbtdb.o     \
      lib/apco.o      lib/c2tpe.o     lib/fasa03.o    lib/obl06.o     lib/pvmpv.o     lib/tcgtt.o      \
      lib/apco13.o    lib/c2txy.o     lib/faur03.o    lib/obl80.o     lib/pvppv.o     lib/tdbtcb.o     \
      lib/apcs.o      lib/cal2jd.o    lib/fave03.o    lib/p06e.o      lib/pvstar.o    lib/tdbtt.o      \
      lib/apcs13.o    lib/cp.o        lib/fk52h.o     lib/p2pv.o      lib/pvtob.o     lib/tf2a.o       \
      lib/aper.o      lib/cpv.o       lib/fk5hip.o    lib/p2s.o       lib/pvu.o       lib/tf2d.o       \
      lib/aper13.o    lib/cr.o        lib/fk5hz.o     lib/pap.o       lib/pvup.o      lib/tr.o         \
      lib/apio.o      lib/d2dtf.o     lib/fw2m.o      lib/pas.o       lib/pvxpv.o     lib/trxp.o       \
      lib/apio13.o    lib/d2tf.o      lib/fw2xy.o     lib/pb06.o      lib/pxp.o       lib/trxpv.o      \
      lib/atci13.o    lib/dat.o       lib/gc2gd.o     lib/pdp.o       lib/refco.o     lib/tttai.o      \
      lib/atciq.o     lib/dtdb.o      lib/gc2gde.o    lib/pfw06.o     lib/rm2v.o      lib/tttcg.o      \
      lib/atciqn.o    lib/dtf2d.o     lib/gd2gc.o     lib/plan94.o    lib/rv2m.o      lib/tttdb.o      \
      lib/atciqz.o    lib/ee00.o      lib/gd2gce.o    lib/pm.o        lib/rx.o        lib/ttut1.o      \
      lib/atco13.o    lib/ee00a.o     lib/gmst00.o    lib/pmat00.o    lib/rxp.o       lib/ut1tai.o     \
      lib/atic13.o    lib/ee00b.o     lib/gmst06.o    lib/pmat06.o    lib/rxpv.o      lib/ut1tt.o      \
      lib/aticq.o     lib/ee06a.o     lib/gmst82.o    lib/pmat76.o    lib/rxr.o       lib/ut1utc.o     \
      lib/aticqn.o    lib/eect00.o    lib/gst00a.o    lib/pmp.o       lib/ry.o        lib/utctai.o     \
      lib/atio13.o    lib/eform.o     lib/gst00b.o    lib/pmpx.o      lib/rz.o        lib/utcut1.o     \
      lib/atioq.o     lib/eo06a.o     lib/gst06.o     lib/pmsafe.o    lib/s00.o       lib/xy06.o       \
      lib/atoc13.o    lib/eors.o      lib/gst06a.o    lib/pn.o        lib/s00a.o      lib/xys00a.o     \
      lib/atoi13.o    lib/epb.o       lib/gst94.o     lib/pn00.o      lib/s00b.o      lib/xys00b.o     \
      lib/atoiq.o     lib/epb2jd.o    lib/h2fk5.o     lib/pn00a.o     lib/s06.o       lib/xys06a.o     \
      lib/bi00.o      lib/epj.o       lib/hfk5z.o     lib/pn00b.o     lib/s06a.o      lib/zp.o         \
      lib/bp00.o      lib/epj2jd.o    lib/ir.o        lib/pn06.o      lib/s2c.o       lib/zpv.o        \
      lib/bp06.o      lib/epv00.o     lib/jd2cal.o    lib/pn06a.o     lib/s2p.o       lib/zr.o         \
      lib/bpn2xy.o    lib/eqeq94.o    lib/jdcalf.o    lib/pnm00a.o    lib/s2pv.o                       \
      lib/c2i00a.o    lib/era00.o     lib/ld.o        lib/pnm00b.o    lib/s2xpv.o                      \
      lib/c2i00b.o    lib/fad03.o     lib/ldn.o       lib/pnm06a.o    lib/sepp.o                       \
      lib/ltpequ.o    lib/ltpecl.o    lib/ltpb.o      lib/ltp.o       lib/lteqec.o    lib/ltecm.o      \
      lib/lteceq.o    lib/icrs2g.o    lib/g2icrs.o    lib/eqec06.o    lib/ecm06.o     lib/eceq06.o     \
      lib/ae2hd.o     lib/hd2ae.o     lib/hd2pa.o     lib/tpors.o     lib/tporv.o     lib/tpsts.o      \
      lib/tpstv.o     lib/tpxes.o     lib/tpxev.o                                                      \
      lib/fk425.o     lib/fk45z.o     lib/fk524.o     lib/fk54z.o                                      \
      lib/atcc13.o    lib/atccq.o     lib/moon98.o                                                     \
      lib/erfadatextra.o

bins: bin/a2af.exe    bin/c2i06a.exe  bin/fae03.exe   bin/ldsun.exe   bin/pnm80.exe   bin/seps.exe     \
      bin/a2tf.exe    bin/c2ibpn.exe  bin/faf03.exe   bin/num00a.exe  bin/pom00.exe   bin/sp00.exe     \
      bin/ab.exe      bin/c2ixy.exe   bin/faju03.exe  bin/num00b.exe  bin/ppp.exe     bin/starpm.exe   \
      bin/af2a.exe    bin/c2ixys.exe  bin/fal03.exe   bin/num06a.exe  bin/ppsp.exe    bin/starpv.exe   \
      bin/anp.exe     bin/c2s.exe     bin/falp03.exe  bin/numat.exe   bin/pr00.exe    bin/sxp.exe      \
      bin/anpm.exe    bin/c2t00a.exe  bin/fama03.exe  bin/nut00a.exe  bin/prec76.exe  bin/sxpv.exe     \
      bin/apcg.exe    bin/c2t00b.exe  bin/fame03.exe  bin/nut00b.exe  bin/pv2p.exe    bin/taitt.exe    \
      bin/apcg13.exe  bin/c2t06a.exe  bin/fane03.exe  bin/nut06a.exe  bin/pv2s.exe    bin/taiut1.exe   \
      bin/apci.exe    bin/c2tcio.exe  bin/faom03.exe  bin/nut80.exe   bin/pvdpv.exe   bin/taiutc.exe   \
      bin/apci13.exe  bin/c2teqx.exe  bin/fapa03.exe  bin/nutm80.exe  bin/pvm.exe     bin/tcbtdb.exe   \
      bin/apco.exe    bin/c2tpe.exe   bin/fasa03.exe  bin/obl06.exe   bin/pvmpv.exe   bin/tcgtt.exe    \
      bin/apco13.exe  bin/c2txy.exe   bin/faur03.exe  bin/obl80.exe   bin/pvppv.exe   bin/tdbtcb.exe   \
      bin/apcs.exe    bin/cal2jd.exe  bin/fave03.exe  bin/p06e.exe    bin/pvstar.exe  bin/tdbtt.exe    \
      bin/apcs13.exe  bin/cp.exe      bin/fk52h.exe   bin/p2pv.exe    bin/pvtob.exe   bin/tf2a.exe     \
      bin/aper.exe    bin/cpv.exe     bin/fk5hip.exe  bin/p2s.exe     bin/pvu.exe     bin/tf2d.exe     \
      bin/aper13.exe  bin/cr.exe      bin/fk5hz.exe   bin/pap.exe     bin/pvup.exe    bin/tr.exe       \
      bin/apio.exe    bin/d2dtf.exe   bin/fw2m.exe    bin/pas.exe     bin/pvxpv.exe   bin/trxp.exe     \
      bin/apio13.exe  bin/d2tf.exe    bin/fw2xy.exe   bin/pb06.exe    bin/pxp.exe     bin/trxpv.exe    \
      bin/atci13.exe  bin/dat.exe     bin/gc2gd.exe   bin/pdp.exe     bin/refco.exe   bin/tttai.exe    \
      bin/atciq.exe   bin/dtdb.exe    bin/gc2gde.exe  bin/pfw06.exe   bin/rm2v.exe    bin/tttcg.exe    \
      bin/atciqn.exe  bin/dtf2d.exe   bin/gd2gc.exe   bin/plan94.exe  bin/rv2m.exe    bin/tttdb.exe    \
      bin/atciqz.exe  bin/ee00.exe    bin/gd2gce.exe  bin/pm.exe      bin/rx.exe      bin/ttut1.exe    \
      bin/atco13.exe  bin/ee00a.exe   bin/gmst00.exe  bin/pmat00.exe  bin/rxp.exe     bin/ut1tai.exe   \
      bin/atic13.exe  bin/ee00b.exe   bin/gmst06.exe  bin/pmat06.exe  bin/rxpv.exe    bin/ut1tt.exe    \
      bin/aticq.exe   bin/ee06a.exe   bin/gmst82.exe  bin/pmat76.exe  bin/rxr.exe     bin/ut1utc.exe   \
      bin/aticqn.exe  bin/eect00.exe  bin/gst00a.exe  bin/pmp.exe     bin/ry.exe      bin/utctai.exe   \
      bin/atio13.exe  bin/eform.exe   bin/gst00b.exe  bin/pmpx.exe    bin/rz.exe      bin/utcut1.exe   \
      bin/atioq.exe   bin/eo06a.exe   bin/gst06.exe   bin/pmsafe.exe  bin/s00.exe     bin/xy06.exe     \
      bin/atoc13.exe  bin/eors.exe    bin/gst06a.exe  bin/pn.exe      bin/s00a.exe    bin/xys00a.exe   \
      bin/atoi13.exe  bin/epb.exe     bin/gst94.exe   bin/pn00.exe    bin/s00b.exe    bin/xys00b.exe   \
      bin/atoiq.exe   bin/epb2jd.exe  bin/h2fk5.exe   bin/pn00a.exe   bin/s06.exe     bin/xys06a.exe   \
      bin/bi00.exe    bin/epj.exe     bin/hfk5z.exe   bin/pn00b.exe   bin/s06a.exe    bin/zp.exe       \
      bin/bp00.exe    bin/epj2jd.exe  bin/ir.exe      bin/pn06.exe    bin/s2c.exe     bin/zpv.exe      \
      bin/bp06.exe    bin/epv00.exe   bin/jd2cal.exe  bin/pn06a.exe   bin/s2p.exe     bin/zr.exe       \
      bin/bpn2xy.exe  bin/eqeq94.exe  bin/jdcalf.exe  bin/pnm00a.exe  bin/s2pv.exe                     \
      bin/c2i00a.exe  bin/era00.exe   bin/ld.exe      bin/pnm00b.exe  bin/s2xpv.exe                    \
      bin/c2i00b.exe  bin/fad03.exe   bin/ldn.exe     bin/pnm06a.exe  bin/sepp.exe                     \
      bin/ltpequ.exe  bin/ltpecl.exe  bin/ltpb.exe    bin/ltp.exe     bin/lteqec.exe  bin/ltecm.exe    \
      bin/lteceq.exe  bin/icrs2g.exe  bin/g2icrs.exe  bin/eqec06.exe  bin/ecm06.exe   bin/eceq06.exe   \
      bin/ae2hd.exe   bin/hd2ae.exe   bin/hd2pa.exe   bin/tpors.exe   bin/tporv.exe   bin/tpsts.exe    \
      bin/tpstv.exe   bin/tpxes.exe   bin/tpxev.exe                                                    \
      bin/fk425.exe   bin/fk45z.exe   bin/fk524.exe   bin/fk54z.exe                                    \
      bin/atcc13.exe  bin/atccq.exe   bin/moon98.exe


all: libs bins

clean:
	$(RM) bin/*.exe
	$(RM) lib/*.o
	$(RM) ../test/era/*.js

.PHONY: all clean
